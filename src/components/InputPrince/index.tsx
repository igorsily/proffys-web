import React, { ChangeEvent, InputHTMLAttributes } from "react";
import NumberFormat from "react-number-format";
import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputPrice: React.FC<InputProps> = ({ label, name, onChange, value }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <NumberFormat
        prefix="R$"
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        onChange={onChange}
        value={value}
        fixedDecimalScale
      />
    </div>
  );
};

export default InputPrice;
