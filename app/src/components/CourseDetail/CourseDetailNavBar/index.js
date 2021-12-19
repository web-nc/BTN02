import React from "react";
import NavBar from "../../NavBar";
import LeftComp from "./LeftComp";
import MidComp from "./MidComp";
import RightComp from "./RightComp";

export default function CourseDetailNavBar({ courseName, role }) {
  return (
    <NavBar
      leftComp={() => <LeftComp courseName={courseName} />}
      midComp={() => <MidComp role={role} />}
      rightComp={() => <RightComp role={role} />}
    />
  );
}
