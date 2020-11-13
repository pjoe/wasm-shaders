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
}`,
  "glsl.frag": `#version 450 core
layout(location=0) out vec4 o_color;
void main() {
    o_color = vec4(1);
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
    <div className="App container w-full mx-2">
      <header className="bg-white w-full shadow">
        <div className="w-full mx-1 py-2 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold leading-tight text-gray-900">
            Wasm Shaders
          </h1>
        </div>
      </header>

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
        <div className="shader-source w-full font-mono text-sm shadow my-2 px-4">
          <SourceInput
            value={source}
            onChange={(val) => {
              setSource(val);
              setOutput(compile(val, inputMode, "spv"));
            }}
          />
        </div>
      </div>
      <div className="shader-output text-sm py-2 px-2">
        <OutputSpv value={output} />
      </div>
    </div>
  );
};

export default App;
