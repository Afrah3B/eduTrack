import React, { useState, useRef, useEffect } from "react";
import "./Select.css";

export const Select = ({ title,options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="select" ref={dropdownRef}>
        <p>{title}</p>
      <div className="select-display" onClick={() => setOpen(!open)}>
        {selectedOption?.label}
        <span className={`arrow ${open ? "open" : ""}`}>▼</span>
      </div>
      {open && (
        <div className="select-options">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`select-option ${
                value === opt.value ? "selected" : ""
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
