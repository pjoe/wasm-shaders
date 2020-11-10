import * as React from "react";

interface SourceInputProps {
  value?: string;
  onChange?: (newValue: string) => void;
}

const SourceInput: React.FC<SourceInputProps> = ({ value = "", onChange }) => {
  return (
    <div>
      <textarea
        placeholder="shader source"
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        cols={60}
        rows={15}
      />
    </div>
  );
};

export default SourceInput;
