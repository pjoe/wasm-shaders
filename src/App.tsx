import * as React from "react";
import "./styles.css";
import InputSelect, { InputMode } from "./components/inputSelect";
import EngineSelect from "./components/engineSelect";
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
    <div className="App mx-0 min-h-screen bg-white">
      <header className="shadow bg-indigo-700">
        <nav className="flex items-center space-x-4 mx-1 py-2 px-2 sm:px-3 lg:px-6 shadow-lg">
          <h1 className="text-2xl leading-tight text-gray-100">
            Wasm Shaders
          </h1>
          <EngineSelect />
          <InputSelect
            onChange={(val) => {
            setInputMode(val);
            setSource(examples[val]);
            setOutput(compile(examples[val], val, "spv"));
            }}
          />
        </nav>
      </header>

      <main className="mx-2 flex flex-wrap items-stretch">
        <div className="flex-grow min-w-min shader-input border-r-2">
          <div className="shader-source w-full h-full font-mono text-sm my-2 px-2">
            <SourceInput
              value={source}
              onChange={(val) => {
                setSource(val);
                setOutput(compile(val, inputMode, "spv"));
              }}
            />
          </div>
        </div>
        <div className="flex-grow shader-output text-sm py-2 px-2">
          <OutputSpv value={output} />
        </div>
      </main>
    </div>
  );
};

export default App;
