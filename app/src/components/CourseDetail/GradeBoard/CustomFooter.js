import React from "react";
import { gridClasses, GridFooterContainer } from "@mui/x-data-grid";
import ExportGradesButton from "./ExportGradesButton";

export default function CustomFooter({ rows, columns, assignments }) {
  return (
    <GridFooterContainer className={gridClasses.footerContainer} style={{ flexDirection: "row-reverse" }}>
      <div style={{ margin: "0.5rem 0.25rem 0.25rem" }}>
        <ExportGradesButton dataRows={rows} headers={columns} assignments={assignments} />
      </div>
    </GridFooterContainer>
  );
}
