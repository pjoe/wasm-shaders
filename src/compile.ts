type InputMode = "glsl.vert" | "glsl.frag" | "wgsl";
type OutputMode = "spv";

export function compile(
  input: string,
  inputMode: InputMode,
  outputMode: OutputMode = "spv"
): string {
  const naga = window.naga;
  const spv = window.spv;
  let nagaIr = -1;
  try {
    switch (inputMode) {
      case "glsl.vert": {
        nagaIr = naga.glsl_in(input, "vertex");
        break;
      }
    }
    if (nagaIr < 0) {
      return "Compile error";
    }

    switch (outputMode) {
      case "spv": {
        const spvData = naga.spv_out(nagaIr);

        return spv.dis(
          spvData,
          spv.SPV_ENV_UNIVERSAL_1_3,
          spv.SPV_BINARY_TO_TEXT_OPTION_INDENT |
            spv.SPV_BINARY_TO_TEXT_OPTION_FRIENDLY_NAMES |
            spv.SPV_BINARY_TO_TEXT_OPTION_COLOR
        );
      }
    }
  } catch (error) {
    return `Compile error: ${error}`;
  }
}
