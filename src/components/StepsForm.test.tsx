import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StepsForm from "./StepsForm";

const mockSteps = [
  { label: "Step 1", subject: "Subject 1", content: "Content 1" },
  { label: "Step 2", subject: "Subject 2", content: "Content 2" }
];

const mockOnAddStep = jest.fn();
const mockOnDeleteStep = jest.fn();
const mockOnChangeStep = jest.fn();

describe("StepsForm", () => {
  test("renders StepsForm component with steps", () => {
    render(
      <StepsForm
        steps={mockSteps}
        onAddStep={mockOnAddStep}
        onDeleteStep={mockOnDeleteStep}
        onChangeStep={mockOnChangeStep}
        onPrev={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(screen.getByText(/sequence steps/i)).toBeInTheDocument();
    expect(
      screen.getByText(/create steps for your sequence/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/step 1/i)).toBeInTheDocument();
    expect(screen.getByText(/step 2/i)).toBeInTheDocument();
  });

  test("calls onAddStep when the add button is clicked", () => {
    render(
      <StepsForm
        steps={mockSteps}
        onAddStep={mockOnAddStep}
        onDeleteStep={mockOnDeleteStep}
        onChangeStep={mockOnChangeStep}
        onPrev={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    fireEvent.click(screen.getByText(/\+ add new step/i));
    expect(mockOnAddStep).toHaveBeenCalledTimes(1);
  });

  test("calls onChangeStep when input value changes", () => {
    render(
      <StepsForm
        steps={mockSteps}
        onAddStep={mockOnAddStep}
        onDeleteStep={mockOnDeleteStep}
        onChangeStep={mockOnChangeStep}
        onPrev={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: "New Subject" }
    });
    expect(mockOnChangeStep).toHaveBeenCalledWith(0, "subject", "New Subject");

    fireEvent.change(screen.getAllByRole("textbox")[1], {
      target: { value: "New Content" }
    });
    expect(mockOnChangeStep).toHaveBeenCalledWith(0, "content", "New Content");
  });
});
