import React from "react";
import { GridToolbarContainer, gridClasses } from "@mui/x-data-grid";
import DownloadGradingTemplate from "./DownloadGradingTemplate";
import DownloadStudentTemplate from "./DownloadStudentTemplate";
import ImportParticipantsButton from "./ImportParticipantsButton";

export default function CustomToolbar({ rows, columns, onFileSelect, role }) {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <div style={{ margin: "0.5rem 0.25rem 0.25rem" }}>
        <DownloadStudentTemplate indexCols={rows} />
      </div>
      <div style={{ margin: "0.5rem 0.25rem 0.25rem" }}>
        <DownloadGradingTemplate indexCols={rows} />
      </div>
      {role === "OWNER" && (
        <div style={{ margin: "0.5rem 0.25rem 0.25rem" }}>
          <ImportParticipantsButton dataRows={rows} headers={columns} onFileSelect={onFileSelect} />
        </div>
      )}
    </GridToolbarContainer>
  );
}
