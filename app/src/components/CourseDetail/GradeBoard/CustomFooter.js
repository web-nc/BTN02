import React from "react";
import { gridClasses, GridFooterContainer } from "@mui/x-data-grid";
import ImportParticipantsButton from "./ImportParticipantsButton";

export default function CustomFooter({ rows, columns, onFileSelect }) {
  return (
    <GridFooterContainer className={gridClasses.footerContainer} style={{ flexDirection: "row-reverse" }}>
      <div style={{ margin: "0.5rem 0.25rem 0.25rem" }}>
        <ImportParticipantsButton dataRows={rows} headers={columns} onFileSelect={onFileSelect} />
      </div>
    </GridFooterContainer>
  );
}
