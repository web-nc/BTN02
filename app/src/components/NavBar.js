import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function MenuAppBar({ leftComp: LeftComp, midComp: MidComp, rightComp: RightComp }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", alignItems: "stretch", justifyContent: "center" }}>
          <Box component={LeftComp} />
          <Box component={MidComp} />
          <Box component={RightComp} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
