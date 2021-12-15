import React, { useRef } from "react";
import { GridColumnMenuContainer } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import Papa from "papaparse";

const menuItemStyle = {
  px: 2,
  textTransform: 'none',
  color: 'GrayText',
  textAlign: 'left',
  marginRight: 'auto'
}

export default function CustomColumnMenu({ 
  hideMenu,
  currentColumn,
  onFileSelect,
  onFinalize
}) {
  const fileUploader = useRef(null);
  const container = useRef(null);

  const handleFileInput = (e) => {
    const files = e.target.files;
    Papa.parse(files[0], {
      complete: function (results) {
        const { data } = results;
        const keys = data.splice(0, 1)[0];
        const rs = data
          .filter((v) => {
            for (let i = 0; i < keys.length; i++) {
              if (v[i]) return true;
            }
            return false;
          })
          .map((v) => {
            let newValue = {};
            for (let i = 0; i < keys.length; i++) {
              newValue[keys[i]] = v[i];
            }
            // Add assignment ID props
            newValue.assignment = currentColumn.field;
            return newValue;
          });
        onFileSelect(rs);
      },
    });
  };

  const handleUploadFile = () => {
    fileUploader.current.click();
    container.current.style.display = "none";
  };

  const handleFinalizedAssignment = () => {
    onFinalize(currentColumn.field);
    container.current.style.display = "none";
  }

  return (
    <GridColumnMenuContainer ref={container} hideMenu={hideMenu} currentColumn={currentColumn}>
      {isEditableField(currentColumn.headerName) && (
        <Box sx={{ display: "flex", flexDirection: "column" }} >
          <input ref={fileUploader} type="file" accept=".csv" onChange={handleFileInput} hidden />
          <Button onClick={handleUploadFile} variant="text" style={menuItemStyle}>
            Tải điểm lên
          </Button>
          <Button onClick={handleFinalizedAssignment} variant="text" style={menuItemStyle}>
            Công bố
          </Button>
        </Box>
      )}
    </GridColumnMenuContainer>
  );
}

const isEditableField = (field) => {
  return field !== "Họ tên" && field !== "MSSV" && field !== "Điểm tổng kết";
};
