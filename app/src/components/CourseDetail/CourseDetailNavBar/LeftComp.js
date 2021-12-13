import React from "react";
import { Box, Typography } from "@mui/material";
import MenuDrawer from "../../MenuDrawer";

export default function LeftComp({ courseName }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, flexBasis: 0 }}>
      <MenuDrawer />

      <Typography variant="h6" component="div" sx={{ ml: 2, flexGrow: 1 }}>
        {courseName}
      </Typography>
    </Box>
  );
}
