import React from "react";
import { render, screen } from "@testing-library/react";
import Breadcrumb from "./Breadcrumb";

test("renders Breadcrumb component with SVGs and text", () => {
  expect.assertions(3);

  render(<Breadcrumb />);
  expect(screen.getByText(/sequence/i)).toBeInTheDocument();

  expect(screen.getByRole("img", { name: /paper plane/i })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /chevron/i })).toBeInTheDocument();
});
