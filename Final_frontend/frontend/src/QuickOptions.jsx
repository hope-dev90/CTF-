import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function OptionButtons({ options, onSelect }) {
  if (!options) return null;

  const buttonStyle = {
    backgroundColor: "#9333ea", 
    color: "white",
    borderColor: "#9333ea",
    transition: "all 0.3s ease",
    borderRadius: "0.75rem" 
  };

  return (
    <div className="d-flex flex-wrap gap-2 mt-2">
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onSelect(opt.title)}
          className="btn shadow-none custom-hover-btn"
          style={buttonStyle}
        >
          {opt.title}
        </button>
      ))}

      <style>
        {`
          .custom-hover-btn:hover {
            background-color: white !important;
            color: #9333ea !important;
            border-color: #9333ea !important;
          }
        `}
      </style>
    </div>
  );
}

export default OptionButtons;