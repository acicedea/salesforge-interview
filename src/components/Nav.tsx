import React from "react";

type NavProps = {
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
};

const Nav: React.FC<NavProps> = ({
  isPrevDisabled,
  isNextDisabled,
  onPrev,
  onNext
}) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex space-x-2">
      <button
        className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
        onClick={onPrev}
        type="button"
        disabled={isPrevDisabled}
      >
        Previous
      </button>
      <button
        className="px-5 py-2 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700"
        onClick={onNext}
        type="button"
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  </div>
);

export default Nav;
