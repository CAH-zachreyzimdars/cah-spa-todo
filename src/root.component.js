import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import TodoPage from "./components/TodoPage.js";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Route path="/todo" component={TodoPage} />
    </BrowserRouter>
  );
}
