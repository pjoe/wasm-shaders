import * as React from "react";
import "./styles.css";
import InputSelect, { InputMode } from "./components/inputSelect";
import SourceInput from "./components/sourceInput";
import OutputSpv from "./components/outputSpv";
import { compile } from "./compile";

const examples: Record<string, string> = {
  "glsl.vert": `#version 450 core
void main() {
    gl_Position = vec4(1);
    return;
}`,
  "glsl.frag": `#version 450 core
layout(location=0) out vec4 o_color;
void main() {
    o_color = vec4(1);
    return;
}`,
  wgsl: `# vertex
[[location(0)]] var<in> a_pos : vec2<f32>;
[[location(0)]] var<out> o_pos : vec4<f32>;

[[stage(vertex)]]
fn main() -> void {
  var w: f32 = 1.0;
  o_pos = vec4<f32>(a_pos, 0.0, w);
  return;
}`
};

const App: React.FC = () => {
  const [inputMode, setInputMode] = React.useState<InputMode>("glsl.vert");
  const [source, setSource] = React.useState(examples[inputMode]);
  const [output, setOutput] = React.useState(compile(source, inputMode, "spv"));
  return (
    <div className="App">
      <h1>Naga</h1>
      <div className="shader-input">
        <div className="shader-type">
          <InputSelect
            onChange={(val) => {
              setInputMode(val);
              setSource(examples[val]);
              setOutput(compile(examples[val], val, "spv"));
            }}
          />
        </div>
        <div className="shader-source">
          <SourceInput
            value={source}
            onChange={(val) => {
              setSource(val);
              setOutput(compile(val, inputMode, "spv"));
            }}
          />
        </div>
      </div>
      <div className="shader-output">
        <OutputSpv value={output} />
      </div>
    </div>
  );
};

export default App;
