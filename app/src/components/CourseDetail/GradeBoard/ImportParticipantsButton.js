import React, { useRef } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button, Tooltip } from "@mui/material";
import Papa from "papaparse";

export default function ImportParticipantsButton({ onFileSelect }) {
  const fileUploader = useRef(null);

  const handleUploadFile = () => {
    fileUploader.current.click();
  };

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
              if (keys[i] === "studentId" || keys[i] === "studentName") newValue[keys[i]] = v[i];
            }
            return newValue;
          });
        onFileSelect(rs);
      },
    });
  };

  return (
    <div>
      <input ref={fileUploader} type="file" accept=".csv" onChange={handleFileInput} hidden />
      <Tooltip title="Tải lên danh sách học viên">
        <Button onClick={handleUploadFile} variant="outlined" color="success" sx={{ textTransform: "none" }}>
          <span style={{ marginRight: "0.25rem", fontWeight: "bold" }}>Tải lên</span>
          <FileUploadIcon />
        </Button>
      </Tooltip>
    </div>
  );
}
