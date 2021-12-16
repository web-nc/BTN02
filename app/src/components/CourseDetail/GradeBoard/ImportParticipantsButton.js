import React, { useRef } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button, Tooltip } from "@mui/material";
// import Papa from "papaparse";
import XLSX from "xlsx";

export default function ImportParticipantsButton({ onFileSelect }) {
  const fileUploader = useRef(null);

  const handleUploadFile = () => {
    fileUploader.current.click();
  };

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
            if (d[i] && (headers[i] === "studentId" || headers[i] === "studentName")) newValue[headers[i]] = String(d[i]);
          }
          return newValue;
        });
      onFileSelect(rs);
    };
    if (files[0]) reader.readAsBinaryString(files[0]);
  };

  return (
    <div>
      <input ref={fileUploader} type="file" accept=".xlsx" onChange={handleFileInput} hidden />
      <Tooltip title="Tải lên danh sách học viên">
        <Button onClick={handleUploadFile} variant="outlined" color="success" sx={{ textTransform: "none" }}>
          <span style={{ marginRight: "0.25rem", fontWeight: "bold" }}>Tải lên</span>
          <FileUploadIcon />
        </Button>
      </Tooltip>
    </div>
  );
}
