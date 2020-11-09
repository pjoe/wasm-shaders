import * as React from "react";

interface SourceInputProps {
  initialValue?: string;
  onChange?: (newValue: string) => void;
}

const SourceInput: React.FC<SourceInputProps> = ({
  initialValue = "",
  onChange
}) => {
  const [value, setValue] = React.useState(initialValue);
  return (
    <div>
      <textarea
        placeholder="shader source"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
        cols={60}
        rows={15}
      />
    </div>
  );
};

export default SourceInput;
