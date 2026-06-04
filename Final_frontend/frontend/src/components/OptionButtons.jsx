import React from "react";

function OptionButtons({ options, onSelect }) {
  if (!options) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onSelect(opt.title)}
          className="
          
            bg-purple-600 text-white border border-purple-600 
          
            hover:bg-white hover:text-purple-600 
           
            px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-300
          "
        >
          {opt.title}
        </button>
      ))}
    </div>
  );
}

export default OptionButtons;