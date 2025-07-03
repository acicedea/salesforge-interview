import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeaderWithNav from "./Nav";

describe("Nav", () => {
  const mockOnPrev = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Previous and Next buttons", () => {
    render(<HeaderWithNav onPrev={mockOnPrev} onNext={mockOnNext} />);
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  test("calls onPrev when Previous button is clicked", () => {
    render(<HeaderWithNav onPrev={mockOnPrev} onNext={mockOnNext} />);
    fireEvent.click(screen.getByText(/previous/i));
    expect(mockOnPrev).toHaveBeenCalledTimes(1);
  });

  test("calls onNext when Next button is clicked", () => {
    render(<HeaderWithNav onPrev={mockOnPrev} onNext={mockOnNext} />);
    fireEvent.click(screen.getByText(/next/i));
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  test("disables Previous button when isPrevDisabled is true", () => {
    render(
      <HeaderWithNav onPrev={mockOnPrev} onNext={mockOnNext} isPrevDisabled />
    );
    const prevButton = screen.getByText(/previous/i);
    expect(prevButton).toBeDisabled();
  });

  test("disables Next button when isNextDisabled is true", () => {
    render(
      <HeaderWithNav onPrev={mockOnPrev} onNext={mockOnNext} isNextDisabled />
    );
    const nextButton = screen.getByText(/next/i);
    expect(nextButton).toBeDisabled();
  });
});
