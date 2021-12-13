import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Typography } from "@mui/material";

export function UnexpectedComponent() {
  return (
    <Box sx={{ width: "33%",height: "100vh", mx: "auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Box
        sx={{
          my: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
          border: "1px solid gray",
          borderRadius: "4px",
        }}>
        <Typography sx={{ my: "1rem" }} variant="h3">
          Page not found
        </Typography>
        <Typography variant="h6">
          Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
        </Typography>
        <Link to="/" style={{ display: "flex", color: "dodgerblue" }}>
          <ArrowBackIosIcon sx={{ fontSize: "1rem", margin: "auto 0" }} />
          <Typography variant="h5">Back to our site</Typography>
        </Link>
      </Box>
    </Box>
  );
}
