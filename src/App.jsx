import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import ShowData from "./components/ShowData";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreatePost></CreatePost>}></Route>
          <Route path="/showData" element={<ShowData></ShowData>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
