
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { LandmarkImage } from "../LandmarkImage";

// Mock fetch for HEAD requests
beforeAll(() => {
  // Only mock HEAD requests for failing image fallback
  global.fetch = jest.fn((url, opts) => {
    if ((opts as any).method === "HEAD") {
      return Promise.resolve({
        status: 404,
        headers: new Map(),
        // @ts-ignore
        entries: () => [],
        // @ts-ignore
        entries() { return []; }
      });
    }
    return Promise.reject(new Error("Unknown fetch method"));
  }) as any;
});

afterAll(() => {
  // @ts-ignore
  global.fetch = undefined;
});

describe("LandmarkImage fallback logic", () => {
  it("falls back to placeholder after both sources fail", async () => {
    const brokenUrl =
      "https://upload.wikimedia.org/not/a/real/path/foo,bar.jpg";
    const { getByAltText, getByTestId, queryByText } = render(
      <LandmarkImage
        imageUrl={brokenUrl}
        alt="Fake landmark"
        retryLabel="Custom retry label"
      />
    );
    const img = getByTestId("landmark-img") as HTMLImageElement;

    // Simulate error for encoded commas
    fireEvent.error(img);
    // Re-render: should try original URL
    await waitFor(() => {
      // It tries the raw URL, then fallback triggers
      // Simulate error again
      fireEvent.error(img);
      // Should now display fallback error
      expect(queryByText(/Image unavailable/i)).toBeInTheDocument();
      expect(img.src).toMatch(/placeholder/);
    });
  });
});
