import React from "react";
import { Card, Typography, Box, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CodeCard({ code }) {
  return (
    <Card>
      <Box sx={{ width: "90%", mx: "auto" }}>
        <Typography variant="h4" color="primary">
          Mã
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">{code}</Typography>
          <IconButton color="primary" onClick={() => navigator.clipboard.writeText(code)}>
            <ContentCopyIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
