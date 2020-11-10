import * as React from "react";
import { render } from "react-dom";

import App from "./App";

async function init() {
  await window.initDone;

  const rootElement = document.getElementById("root");
  render(<App />, rootElement);
}

if (
  document.readyState !== "complete" &&
  document.readyState !== "interactive"
) {
  // console.log("adding document listener");
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
