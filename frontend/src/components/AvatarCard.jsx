// components/AvatarCard.jsx
import React from 'react';

const AvatarCard = ({ image, label, selected, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-200 ease-in-out transform hover:-translate-y-1 ${selected ? 'ring-4 ring-indigo-500 scale-105' : 'ring-1 ring-gray-200'}`}
    >
      {/* Image */}
      <div className="aspect-square w-full">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover group-hover:brightness-110 transition"
        />
      </div>

      {/* Overlay with label */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
        <h3 className="text-white font-medium text-sm truncate">{label}</h3>
      </div>

      {/* Selection indicator */}
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-md">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default AvatarCard;