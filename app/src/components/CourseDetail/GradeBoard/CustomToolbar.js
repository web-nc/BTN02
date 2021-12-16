import React from "react";
import { GridToolbarContainer, gridClasses } from "@mui/x-data-grid";
import ExportGradesButton from "./ExportGradesButton";
import DownloadGradingTemplate from "./DownloadGradingTemplate";
import DownloadStudentTemplate from "./DownloadStudentTemplate";

export default function CustomToolbar({ rows, columns }) {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <div style={{ margin: "0.5rem 0.25rem 0.25rem" }}>
        <DownloadStudentTemplate indexCols={rows} />
      </div>
      <div style={{ margin: "0.5rem 0.25rem 0.25rem" }}>
        <DownloadGradingTemplate indexCols={rows} />
      </div>
      <div style={{ margin: "0.5rem 0.25rem 0.25rem" }}>
        <ExportGradesButton dataRows={rows} headers={columns} />
      </div>
    </GridToolbarContainer>
  );
}
