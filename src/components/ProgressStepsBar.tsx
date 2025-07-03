import React, { useRef, useLayoutEffect, useState } from "react";

type Step = {
  label: string;
  description: string;
};

type ProgressStepsBarProps = {
  currentStep?: number;
};

const steps: Step[] = [
  {
    label: "Name & Product",
    description: "Provide sequence name & product"
  },
  {
    label: "Sequence steps",
    description: "Create sequence steps for your sequence"
  },
  {
    label: "Summary",
    description: "Summary of your sequence"
  }
];

const ProgressStepsBar: React.FC<ProgressStepsBarProps> = ({
  currentStep = 2
}) => {
  const [offsets, setOffsets] = useState({ left: 0, right: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLDivElement>(null);
  const lastDotRef = useRef<HTMLDivElement>(null);

  const total = steps.length - 1;
  const progressPercent = ((currentStep - 1) / total) * 100;

  useLayoutEffect(() => {
    if (containerRef.current && firstDotRef.current && lastDotRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const firstDotRect = firstDotRef.current.getBoundingClientRect();
      const lastDotRect = lastDotRef.current.getBoundingClientRect();

      const left =
        firstDotRect.left + firstDotRect.width / 2 - containerRect.left;
      const right =
        containerRect.right - (lastDotRect.left + lastDotRect.width / 2);

      setOffsets({ left, right });
    }
  }, []);

  return (
    <div
      className="relative w-full max-w-5xl mx-auto mb-16"
      data-testid="progress-steps-bar"
      ref={containerRef}
    >
      {/* The line: starts/ends at center of first/last dot */}
      <div
        className="absolute top-3 h-1"
        style={{
          left: offsets.left,
          right: offsets.right
        }}
      >
        {/* Gray line */}
        <div className="w-full h-full bg-gray-200 rounded" />
        {/* Purple progress line */}
        <div
          className="absolute top-0 left-0 h-full bg-purple-600 rounded transition-all"
          style={{
            width: `${progressPercent}%`,
            zIndex: 1
          }}
          data-testid="progress-bar"
        />
      </div>
      {/* Dots */}
      <div className="flex justify-between relative z-10">
        {steps.map((step, idx) => {
          const isCompleted = idx + 1 < currentStep;
          const isCurrent = idx + 1 === currentStep;
          const dotRef =
            idx === 0
              ? firstDotRef
              : idx === steps.length - 1
              ? lastDotRef
              : undefined;
          return (
            <div
              key={step.label}
              className="flex flex-col items-center w-40"
              data-testid={`step-${idx}`}
              ref={dotRef}
            >
              <div
                className="relative flex items-center justify-center"
                style={{ zIndex: 2 }}
              >
                {/* Halo background for current step */}
                {isCurrent && (
                  <div
                    className="absolute"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "rgba(139, 92, 246, 0.15)",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 0
                    }}
                    aria-hidden="true"
                  />
                )}
                {/* Main dot with border */}
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full border-2
            ${
              isCompleted || isCurrent ? "border-purple-600" : "border-gray-300"
            }
          `}
                  data-testid={`dot-${idx}`}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    backgroundColor: isCompleted ? "#ffffff" : "#fff"
                  }}
                >
                  {isCompleted ? (
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-label="completed"
                      data-testid={`checkmark-${idx}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : isCurrent ? (
                    <div
                      className="w-4 h-4 rounded-full bg-purple-600"
                      aria-label="current"
                      data-testid={`current-dot-${idx}`}
                    ></div>
                  ) : (
                    <div
                      className="w-3 h-3 rounded-full"
                      aria-label="future"
                      style={{ backgroundColor: "#ebecf0" }}
                      data-testid={`future-dot-${idx}`}
                    ></div>
                  )}
                </div>
              </div>
              <span
                className={`mt-3 font-semibold text-base ${
                  isCurrent ? "text-purple-600" : "text-gray-800"
                }`}
              >
                {step.label}
              </span>
              <span
                className={`text-sm text-center ${
                  isCurrent ? "text-purple-400" : "text-gray-400"
                }`}
              >
                {step.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressStepsBar;
