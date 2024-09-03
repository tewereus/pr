import React, { useRef, useState } from "react";

const MultiSelect = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const handleOptionClick = (option) => {
    const newSelection = selectedOptions.includes(option.value)
      ? selectedOptions.filter((value) => value !== option.value)
      : [...selectedOptions, option.value];
    onChange(newSelection);
  };

  const handleRemoveTag = (value) => {
    const newSelection = selectedOptions.filter((option) => option !== value);
    onChange(newSelection);
  };

  return (
    <div className="relative">
      <div
        className="border rounded-lg p-2 cursor-pointer flex flex-wrap items-center m-4"
        onClick={() => setIsOpen(!isOpen)}
        ref={inputRef}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((value) => (
            <div
              key={value}
              className="bg-gray-200 rounded-full px-2 py-1 text-sm flex items-center mr-2"
            >
              {options.find((opt) => opt.value === value)?.label}
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(value);
                }}
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <span className="text-gray-500">Select colors</span>
        )}
      </div>
      {isOpen && (
        <div className="absolute border rounded-lg bg-white shadow-lg z-10 mt-2 w-full">
          {options.map((option) => (
            <div
              key={option.value}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${
                selectedOptions.includes(option.value) ? "bg-gray-300" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
