import React from "react";
import { GridToolbarContainer, gridClasses } from "@mui/x-data-grid";
import ExportGradesButton from "./ExportGradesButton";
import DownloadTemplateButton from "./DownloadTemplateButton";
import ImportParticipantsButton from "./ImportParticipantsButton";

export default function CustomToolbar({ rows, columns, onFileSelect }) {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <div style={{ margin: "0.5rem 0.25rem 0.25rem" }}>
        <DownloadTemplateButton indexCols={rows} />
      </div>
      <div style={{ margin: "0.5rem 0.25rem 0.25rem" }}>
        <ExportGradesButton dataRows={rows} headers={columns} />
      </div>
      <div style={{ margin: "0.5rem 0.25rem 0.25rem" }}>
        <ImportParticipantsButton onFileSelect={onFileSelect} />
      </div>
    </GridToolbarContainer>
  );
}
