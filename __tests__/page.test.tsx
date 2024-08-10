import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/app/page";

describe("Page", () => {
  it("renders the main element", () => {
    render(<Home />);

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders the analytics link", () => {
    render(<Home />);

    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("renders the search input box", () => {
    render(<Home />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders the search submit button", () => {
    render(<Home />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("displays an error message when city is not found", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: "Not Found",
      }),
    ) as jest.Mock;

    render(<Home />);

    const textbox = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(textbox, { target: { value: "InvalidCity" } });
    fireEvent.click(button);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /City not found. Check the spelling./i,
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("displays an error message when city is empty", async () => {
    render(<Home />);

    const textbox = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(textbox, { target: { value: "" } });
    fireEvent.click(button);

    await waitFor(() => {
      const errorMessage = screen.getByText(/City cannot be empty./i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
