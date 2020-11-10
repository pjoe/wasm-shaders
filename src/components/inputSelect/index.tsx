import * as React from "react";

export type InputMode = "glsl.vert" | "glsl.frag" | "wgsl";

interface InputSelectProps {
  initialValue?: InputMode;
  onChange?: (newValue: InputMode) => void;
}

const options: InputMode[] = ["glsl.vert", "glsl.frag", "wgsl"];

const InputSelect: React.FC<InputSelectProps> = ({
  initialValue = "glsl.vert",
  onChange
}) => {
  const [value, setValue] = React.useState(initialValue);
  return (
    <select
      placeholder="source format"
      value={value}
      onChange={(e) => {
        setValue(e.target.value as InputMode);
        onChange?.(e.target.value as InputMode);
      }}
    >
      {options.map((o, idx) => (
        <option value={o} key={o}>
          {o}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;
