import * as React from "react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/clike/clike";

import { Controlled as CodeMirror } from "react-codemirror2";

interface SourceInputProps {
  value?: string;
  onChange?: (newValue: string) => void;
}

const SourceInput: React.FC<SourceInputProps> = ({ value = "", onChange }) => {
  return (
    <CodeMirror
      className="box-border w-full h-full resize-none"
      options={{
        lineNumbers: true,
        indentUnit: 4,
        mode: "x-shader/x-vertex",
      }}
      value={value}
      onBeforeChange={(_editor, _data, value) => {
        onChange?.(value);
      }}
    />
  );
};

export default SourceInput;
