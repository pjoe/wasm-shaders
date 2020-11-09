import * as React from "react";
import "./styles.css";
import SourceInput from "./components/sourceInput";
import OutputSpv from "./components/outputSpv";
import { compile } from "./compile";

const App: React.FC = () => {
  const initialSource = `#version 450 core
void main() {
    gl_Position = vec4(1);
    return;
}`;
  const [output, setOutput] = React.useState(
    compile(initialSource, "glsl.vert", "spv")
  );
  return (
    <div className="App">
      <h1>Naga</h1>
      <SourceInput
        initialValue={initialSource}
        onChange={(val) => {
          setOutput(compile(val, "glsl.vert", "spv"));
        }}
      />
      <div className="output">
        <OutputSpv value={output} />
      </div>
    </div>
  );
};

export default App;
