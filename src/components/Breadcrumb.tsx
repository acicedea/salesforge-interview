import React from "react";

const Breadcrumb = () => (
  <div className="flex items-center space-x-2 mb-6">
    <svg
      role="img"
      aria-label="Paper plane"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="text-gray-500"
      style={{ transform: "rotate(-8deg)" }}
    >
      <title>Paper plane</title>
      <path
        d="M3 10L17 4L11 17L9 11L3 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
    <svg
      role="img"
      aria-label="Chevron"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="text-gray-300"
    >
      <title>Chevron</title>
      <path
        d="M5 3L9 7L5 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="text-gray-500 text-lg font-medium">Sequence</span>
  </div>
);

export default Breadcrumb;
