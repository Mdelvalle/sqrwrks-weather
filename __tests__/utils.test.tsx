import "@testing-library/jest-dom";
import utils from "@/app/utils";
import { WeatherProps, WeatherData } from "@/app/types/weatherTypes";

describe("Utils Functions", () => {
  describe("capitalize", () => {
    it("should capitalize each word in a string", () => {
      const input = "clear sky";
      const output = utils.capitalize(input);
      expect(output).toBe("Clear Sky");
    });

    it("should return undefined if input is undefined", () => {
      const output = utils.capitalize(undefined);
      expect(output).toBeUndefined();
    });

    it("should return an empty string if input is an empty string", () => {
      const output = utils.capitalize("");
      expect(output).toBeUndefined();
    });
  });

  describe("getWeatherForecast", () => {
    it("should correctly format weather forecast data", () => {
      const mockWeatherData: WeatherData[] = [
        {
          name: "Austin",
          dt: 1723252781,
          main: {
            temp: 89,
            humidity: 59,
            temp_max: 100,
            temp_min: 80,
            feels_like: 93,
          },
          weather: [{ description: "clouds", icon: "02n" }],
          wind: { speed: 12.66, deg: 120 },
        },
        {
          name: "San Francisco",
          dt: 1723252899,
          main: {
            temp: 68,
            humidity: 78,
            temp_max: 72,
            temp_min: 62,
            feels_like: 66,
          },
          weather: [{ description: "fog", icon: "50d" }],
          wind: { speed: 9.84, deg: 240 },
        },
      ];

      const output = utils.getWeatherForecast(mockWeatherData);
      expect(output).toEqual([
        {
          ...output[0],
          temperature: "89",
          icon: "02n",
          description: "clouds",
        },
        {
          ...output[1],
          temperature: "68",
          icon: "50d",
          description: "fog",
        },
      ]);
    });

    it("should handle an empty weather data list", () => {
      const output = utils.getWeatherForecast([]);
      expect(output).toEqual([]);
    });
  });

  describe("getWeatherInfo", () => {
    it("should return correct weather information", () => {
      const mockWeatherData: WeatherData = {
        name: "Austin",
        dt: 1723252781,
        main: {
          temp: 89,
          humidity: 59,
          temp_max: 100,
          temp_min: 80,
          feels_like: 93,
        },
        weather: [{ description: "clouds", icon: "02n" }],
        wind: { speed: 12.66, deg: 120 },
      };

      const output = utils.getWeatherInfo(mockWeatherData);
      expect(output).toEqual({
        name: "Austin",
        description: "Clouds",
        temperature: "89",
        humidity: "59",
      });
    });

    it("should return null if input data is null", () => {
      const output = utils.getWeatherInfo(null);
      expect(output).toBeNull();
    });
  });

  describe("formatHour", () => {
    it("should format 0 hour as 12:00 AM", () => {
      const output = utils.formatHour(0);
      expect(output).toBe("12:00 AM");
    });

    it("should format 13 hour as 1:00 PM", () => {
      const output = utils.formatHour(13);
      expect(output).toBe("1:00 PM");
    });

    it("should format 23 hour as 11:00 PM", () => {
      const output = utils.formatHour(23);
      expect(output).toBe("11:00 PM");
    });

    it("should format 12 hour as 12:00 PM", () => {
      const output = utils.formatHour(12);
      expect(output).toBe("12:00 PM");
    });
  });
});
