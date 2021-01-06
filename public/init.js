import * as naga from "https://unpkg.com/wasm-naga@0.2.0/web/wasm_naga.js";

window.initDone = new Promise((resolve) => {
  window.addEventListener("load", async () => {
    // console.log("async init");
    if (window.process && window.process.versions) {
      window.process.versions.node = undefined;
    }
    const spv = await window.Module();
    // console.log("spv ready: spv.dis", spv.dis);

    await naga.default();
    // console.log("naga ready");
    window.naga = naga;
    window.spv = spv;
    resolve();
  });
});
