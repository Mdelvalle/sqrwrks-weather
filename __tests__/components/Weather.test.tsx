import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Weather from "@/app/components/weather";
import { WeatherProps } from "@/app/types/weatherTypes";

const mockWeatherData: WeatherProps = {
  data: {
    name: "Austin",
    description: "Clear Sky",
    temperature: "89",
    humidity: "59",
  },
  forecast: [
    {
      time: "12:00 PM",
      icon: "01d",
      temperature: "85",
      description: "Sunny",
    },
    {
      time: "3:00 PM",
      icon: "01d",
      temperature: "87",
      description: "Sunny",
    },
  ],
};

describe("Weather Component", () => {
  it("renders the city name, temperature, and humidity", () => {
    render(<Weather {...mockWeatherData} />);

    expect(screen.getByText("Austin")).toBeInTheDocument();
    expect(screen.getByText("Clear Sky")).toBeInTheDocument();
    expect(screen.getByText("89°")).toBeInTheDocument();
    expect(screen.getByText("59%")).toBeInTheDocument();
  });

  it("renders the forecast data correctly", () => {
    render(<Weather {...mockWeatherData} />);

    // Check that the first forecast entry is rendered correctly
    expect(screen.getByText("12:00 PM")).toBeInTheDocument();
    expect(screen.getByText("85°")).toBeInTheDocument();

    // Check that the second forecast entry is rendered correctly
    expect(screen.getByText("3:00 PM")).toBeInTheDocument();
    expect(screen.getByText("87°")).toBeInTheDocument();
  });
});
