import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material";
import XLSX from "xlsx";
import moment from "moment";

export default function ExportGradesButton({ dataRows, headers }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const executeDownloadFile = () => {
    const result = [];
    dataRows.forEach((r) => {
      let newData = {};
      headers.forEach((h) => {
        if (typeof r[h.field] === typeof {}) newData[h.headerName] = r[h.field].point;
        else newData[h.headerName] = r[h.field];
      });
      result.push(newData);
    });
    console.log(result);

    //Had to create a new workbook and then add the header
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);

    //Starting in the second row to avoid overriding and skipping headers
    XLSX.utils.sheet_add_json(ws, result);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "grades_" + moment(new Date()).format("YYYY-MM-DD-hh-mm-ss") + ".xlsx");

    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Tải toàn bộ bảng điểm">
        <Button onClick={handleClickOpen} variant="outlined" color="primary" sx={{ textTransform: "none" }}>
          <span style={{ marginRight: "0.25rem", fontWeight: "bold" }}>Tải bảng điểm</span>
          <FileDownloadIcon />
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Xác nhận tải xuống bảng điểm của lớp?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nội dung tải về sẽ được lưu dưới dạng (.xlsx). Bạn có thể mở bằng excel để xem tiện hơn
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={executeDownloadFile} autoFocus>
            Tải
          </Button>
          <Button onClick={handleClose}>Huỷ</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
