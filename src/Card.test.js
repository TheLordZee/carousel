import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it("shoulde render a card", () => {
    render(<Card />);
})

it("matches snapshot", () => {
    const {asFragment} = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
})