import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    fetch("/blocklands.html")
      .then((res) => res.text())
      .then((text) => {
        if (!alive) return;
        const root = host.current;
        if (!root || root.querySelector("canvas")) return;
        const doc = new DOMParser().parseFromString(text, "text/html");
        const css = doc.querySelector("style")?.textContent ?? "";
        const style = document.createElement("style");
        style.dataset.blocklands = "1";
        style.textContent = css;
        if (!document.head.querySelector("style[data-blocklands]")) document.head.appendChild(style);
        root.replaceChildren();
        const canvas = doc.querySelector("canvas");
        const ui = doc.querySelector("#ui");
        if (canvas) root.appendChild(canvas);
        if (ui) root.appendChild(ui);
        const code = doc.querySelector("script")?.textContent;
        if (!code || document.querySelector("script[data-blocklands]")) return;
        const script = document.createElement("script");
        script.dataset.blocklands = "1";
        script.textContent = code;
        document.body.appendChild(script);
      })
      .catch(() => {
        if (host.current) host.current.textContent = "Blocklands failed to start. Reload the page.";
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <main ref={host} className="game-frame">
      <section className="boot-fallback">
        <p className="boot-fallback__mark">Blocklands</p>
        <p>Loading the island…</p>
      </section>
    </main>
  );
}
