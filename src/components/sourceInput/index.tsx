import * as React from "react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/clike/clike";
import "codemirror/mode/rust/rust";

import { Controlled as CodeMirror } from "react-codemirror2";

export type InputMode = "glsl.vert" | "glsl.frag" | "wgsl";

interface SourceInputProps {
  value?: string;
  mode: InputMode;
  onChange?: (newValue: string) => void;
}

const codeMirroModes: Record<InputMode, string> = {
  "glsl.vert": "x-shader/x-vertex",
  "glsl.frag": "x-shader/x-fragment",
  wgsl: "rust",
};

const SourceInput: React.FC<SourceInputProps> = ({
  value = "",
  onChange,
  mode,
}) => {
  return (
    <CodeMirror
      className="box-border w-full h-full resize-none"
      options={{
        lineNumbers: true,
        indentUnit: 4,
        mode: codeMirroModes[mode],
      }}
      value={value}
      onBeforeChange={(_editor, _data, value) => {
        onChange?.(value);
      }}
    />
  );
};

export default SourceInput;
