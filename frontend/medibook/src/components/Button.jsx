// Button.jsx (The prop is included inside a template literal)
import React from "react";
export function Button({
  children,
  color = "bg-[#FFB340]",
  textColor = "text-white",
}) {
  // `color` should be something like "bg-red-500 text-white"
  return (
    <button
      className={`rounded-xl w-33 h-14   ${color} ${textColor} hover:opacity-75`}
    >
      {children}
    </button>
  );
}
