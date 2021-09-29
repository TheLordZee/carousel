import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("should render a Carousel", () => {
  render(<Carousel />)
})

it("matches snapshot", () => {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("goes back and forward when you click the buttons", () => {
  const {getByTestId, getByText} = render(<Carousel />);
  const rightArrow = getByTestId("right-arrow");
  const txt = getByText("Image 1 of 3.")
  fireEvent.click(rightArrow);
  expect(txt).toHaveTextContent("2");

  const leftArrow = getByTestId("left-arrow");
  fireEvent.click(leftArrow);
  expect(txt).toHaveTextContent("1");
});

test("left arrow is hidden when on the first page", () => {
  const {queryByTestId} = render(<Carousel />)
  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).not.toBeVisible();
})

test("right arrow is hidden when on the last page", () => {
  const {queryByTestId, getByText} = render(<Carousel />)
  const txt = getByText("Image 1 of 3.")
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(txt).toHaveTextContent("3");
  expect(rightArrow).not.toBeVisible();
})