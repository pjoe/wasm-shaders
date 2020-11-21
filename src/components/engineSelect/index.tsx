import * as React from "react";

export type EngineOption = "naga";

interface EngineSelectProps {
  initialValue?: EngineOption;
  onChange?: (newValue: EngineOption) => void;
}

const options: EngineOption[] = ["naga"];

const EngineSelect: React.FC<EngineSelectProps> = ({
  initialValue = "naga",
  onChange
}) => {
  const [value, setValue] = React.useState(initialValue);
  return (
    <select className="focus:outline-none py-1 px-1 rounded-md border-2 border-indigo-500 hover:border-indigo-400"
      placeholder="source format"
      value={value}
      onChange={(e) => {
        setValue(e.target.value as EngineOption);
        onChange?.(e.target.value as EngineOption);
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

export default EngineSelect;
