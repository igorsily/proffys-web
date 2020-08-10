import React, { ChangeEvent, InputHTMLAttributes } from "react";
import NumberFormat from "react-number-format";
import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputCellphone: React.FC<InputProps> = ({
  label,
  name,
  onChange,
  value,
}) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <NumberFormat
        format="+55 (##) #####-####"
        mask=""
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputCellphone;
