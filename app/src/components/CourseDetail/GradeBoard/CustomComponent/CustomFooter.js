import React from "react";
import { Typography } from '@mui/material';
import { gridClasses, GridFooterContainer } from "@mui/x-data-grid";
import ExportGradesButton from "./ExportGradesButton";

export default function CustomFooter({ rows, columns, assignments }) {
  return (
    <GridFooterContainer className={gridClasses.footerContainer} style={{ flexDirection: "row-reverse" }}>
      <div style={{ margin: "0.5rem 0.25rem 0.25rem" }}>
        <ExportGradesButton dataRows={rows} headers={columns} assignments={assignments} />
      </div>
      <Typography sx={{ marginLeft: '20px', flexGrow: 1 }} color="text.secondary" display="block" variant="subtitle1" >
        Chú ý: điểm có dấu chấm đỏ là điểm chưa được công bố cho học sinh
      </Typography>
    </GridFooterContainer>
  );
}
