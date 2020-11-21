import * as React from "react";

interface SourceInputProps {
  value?: string;
  onChange?: (newValue: string) => void;
}

const SourceInput: React.FC<SourceInputProps> = ({ value = "", onChange }) => {
  return (
    <textarea
    className="box-border w-full h-full resize-none"
      placeholder="shader source"
      value={value}
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
      cols={50}
      rows={25}
    />
  );
};

export default SourceInput;
