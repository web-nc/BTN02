import React, { useRef } from "react";
import { GridColumnMenuContainer } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import XLSX from "xlsx";

const menuItemStyle = {
  px: 2,
  textTransform: "none",
  color: "GrayText",
  textAlign: "left",
  marginRight: "auto",
};

export default function CustomColumnMenu({ hideMenu, currentColumn, onFileSelect, onFinalize }) {
  const fileUploader = useRef(null);
  const container = useRef(null);

  const handleFileInput = (e) => {
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      let dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const headers = dataParse.splice(0, 1)[0];
      const rs = dataParse
        .filter((d) => {
          for (let i = 0; i < headers.length; i++) {
            if (d[i]) return true;
          }
          return false;
        })
        .map((d) => {
          let newValue = {};
          for (let i = 0; i < headers.length; i++) {
            newValue[headers[i]] = d[i];
          }
          // Add assignment ID props
          newValue.assignment = currentColumn.field;
          return newValue;
        });
      onFileSelect(rs);
    };
    if (files[0]) reader.readAsBinaryString(files[0]);
  };

  const handleUploadFile = () => {
    fileUploader.current.click();
    container.current.style.display = "none";
  };

  const handleFinalizedAssignment = () => {
    onFinalize(currentColumn.field);
    container.current.style.display = "none";
  };

  return (
    <GridColumnMenuContainer ref={container} hideMenu={hideMenu} currentColumn={currentColumn}>
      {isEditableField(currentColumn.headerName) && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <input ref={fileUploader} type="file" accept=".xlsx" onChange={handleFileInput} hidden />
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
