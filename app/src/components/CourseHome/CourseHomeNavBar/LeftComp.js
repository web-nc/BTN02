import React from "react";
import { Typography, Box } from "@mui/material";
import MenuDrawer from "../../MenuDrawer";

export default function LeftComp() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginRight: "auto" }}>
      <MenuDrawer />
     
      <Typography variant="h6" component="div" sx={{ ml: 2 ,flexGrow: 1, alignSelf: "center" }}>
        Lớp học
      </Typography>
    </Box>
  );
}
