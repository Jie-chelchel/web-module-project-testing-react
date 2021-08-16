import React from "react";
import { render, screen } from "@testing-library/react";
import Display from "./../Display";
import fetchShow from "../../api/fetchShow";
import userEvent from "@testing-library/user-event";
jest.mock("../../api/fetchShow");

test("renders without error", () => {
  render(<Display />);
});

test("renders without error", async () => {
  fetchShow.mockResolvedValueOnce({
    name: "Stranger Things",
    image: {
      medium:
        "https://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
    },
    seasons: [
      { id: 0, name: "Season 1", episodes: [] },
      { id: 1, name: "Season 2", episodes: [] },
      { id: 2, name: "Season 3", episodes: [] },
    ],
    summary: "A love letter to the '80s classics that captivated a generation",
  });
  const fakeDisplayFunc = jest.fn();
  render(<Display displayFunc={fakeDisplayFunc} />);

  const buttonElement = screen.getByRole("button");
  userEvent.click(buttonElement);
  const showName = await screen.findByText("Stranger Things");
  expect(showName).toBeInTheDocument();
  const options = screen.getAllByRole("option");
  expect(options.length).toBe(4);
  expect(fakeDisplayFunc).toHaveBeenCalledTimes(1);
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
