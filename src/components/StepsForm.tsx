import React from "react";
import type { Step } from "./SequenceStepsPage";
import HeaderWithNav from "./Nav"; // Adjust import path as needed

type StepsFormProps = {
  steps: Step[];
  onAddStep: () => void;
  onDeleteStep: (idx: number) => void;
  onChangeStep: (idx: number, field: keyof Step, value: string) => void;
  onPrev: () => void;
  onNext: () => void;
};

const StepsForm: React.FC<StepsFormProps> = ({
  steps,
  onAddStep,
  onDeleteStep,
  onChangeStep,
  onPrev,
  onNext
}) => (
  <div className="w-full mb-12">
    <div className="flex items-center justify-between mb-1">
      <h2 className="text-xl font-semibold">Sequence steps</h2>
      <HeaderWithNav onPrev={onPrev} onNext={onNext} isPrevDisabled={true} />
    </div>
    <p className="text-gray-500 mb-6">Create steps for your sequence</p>

    {steps.map((step, idx) => (
      <div
        key={idx}
        className="bg-white border rounded-xl shadow-sm mb-8 p-8 relative"
      >
        {idx > 0 && (
          <button
            onClick={() => onDeleteStep(idx)}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
            aria-label="Delete step"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        <div className="font-medium mb-4 flex items-center space-x-2">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-500"
          >
            <rect x="3" y="5" width="14" height="10" rx="2" />
            <path d="M3 7l7 5 7-5" />
          </svg>
          <span>{step.label}</span>
        </div>
        <input
          className="w-full border border-gray-200 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="Subject"
          value={step.subject}
          onChange={(e) => onChangeStep(idx, "subject", e.target.value)}
        />
        <div className="flex items-center space-x-2 mb-2 text-gray-500">
          <button
            className="p-1 rounded hover:bg-gray-100 font-bold"
            type="button"
          >
            B
          </button>
          <button
            className="p-1 rounded hover:bg-gray-100 italic"
            type="button"
          >
            I
          </button>
          <button
            className="p-1 rounded hover:bg-gray-100 font-bold"
            type="button"
          >
            H
          </button>
          <button className="p-1 rounded hover:bg-gray-100" type="button">
            "
          </button>
          <button className="p-1 rounded hover:bg-gray-100" type="button">
            🔗
          </button>
          <button className="p-1 rounded hover:bg-gray-100" type="button">
            🖼️
          </button>
          <button className="p-1 rounded hover:bg-gray-100" type="button">
            •
          </button>
          <button className="p-1 rounded hover:bg-gray-100" type="button">
            1.
          </button>
        </div>
        <textarea
          className="w-full border border-gray-200 rounded-md px-3 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder=""
          value={step.content}
          onChange={(e) => onChangeStep(idx, "content", e.target.value)}
        />
      </div>
    ))}

    <div className="flex justify-center mb-8">
      <button
        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
        onClick={onAddStep}
        type="button"
      >
        + Add new step
      </button>
    </div>
  </div>
);

export default StepsForm;
