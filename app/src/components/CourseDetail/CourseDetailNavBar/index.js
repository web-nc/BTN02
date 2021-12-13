import React from "react";
import NavBar from "../../NavBar";
import UserButton from "../../UserButton";
import LeftComp from "./LeftComp";
import MidComp from "./MidComp";

export default function CourseDetailNavBar({ courseName, role }) {
  const style = { flexGrow: 1, flexBasis: 0, justifyContent: "end" };
  return (
    <NavBar
      leftComp={() => <LeftComp courseName={courseName} />}
      midComp={() => <MidComp role={role} />}
      rightComp={() => <UserButton style={style} />}
    />
  );
}
