"use client";

import React, { useState } from "react";
import ReactToggle from "react-toggle";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import "react-toggle/style.css";

interface ToggleProps {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  defaultChecked?: boolean;
  required?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  id,
  label,
  register,
  errors,
  defaultChecked = false,
  required = false,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="w-full flex items-center gap-4">
      <label
        className={`text-md ${errors[id] ? "text-red-700" : "text-zinc-400"}`}
      >
        {label}
      </label>

    <ReactToggle
        id={id}
        {...register(id, { required })}
        checked={isChecked}
        onChange={handleChange}
        className={`react-toggle ${errors[id] ? "border-red-700" : "border-neutral-300"}`}
    />
    </div>
  );
};

export default Toggle;
