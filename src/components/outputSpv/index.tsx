import * as React from "react";

interface OutputSpvProps {
  value: string;
}

const colorCodes: Record<string, string> = {
  "0m": "black",
  "30m": "black",
  "31m": "red",
  "32m": "green",
  "33m": "yellow",
  "34m": "blue",
  "35m": "magenta",
  "36m": "cyan",
  "37m": "white",
  "1;30m": "bright-black",
  "1;31m": "bright-red"
};

/* eslint-disable no-control-regex */
const OutputSpv: React.FC<OutputSpvProps> = ({ value }) => {
  const preRef = React.useRef<HTMLPreElement>(null);
  const [rendered, setRendered] = React.useState(false);
  if (preRef.current) {
    let colored = value;
    colored = colored.replace(
      /\x1b\[([^m]+m)([^\x1b]*)\x1b\[0m/g,
      (m, p1, p2) => {
        const color = colorCodes[p1];
        if (!color) {
          return p2;
        }
        return `<span class="term-${color}">${p2}</span>`;
      }
    );
    colored = colored.replace(/\x1b\[0m/g, "");
    preRef.current.innerHTML = colored;
  } else {
    if (!rendered) {
      setTimeout(() => setRendered(true), 1);
    }
  }
  return (
    <div>
      <pre ref={preRef}>Content</pre>
    </div>
  );
};

export default OutputSpv;
