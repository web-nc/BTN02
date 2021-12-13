import React from "react";
import LeftComp from "./LeftComp";
import RightComp from "./RightComp";
import NavBar from "../../NavBar";

export default function CourseHomeNavBar() {
  return <NavBar leftComp={LeftComp} rightComp={RightComp} />;
}
