import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material";
import { ExportToCsv } from "export-to-csv";
import moment from "moment";

let options = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  filename: "grades_" + moment(new Date()).format("YYYY-MM-DD-hh-mm-ss"),
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
};

export default function ExportGradesButton({ dataRows, headers }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const executeDownloadFile = () => {
    options.filename = "grades_" + moment(new Date()).format("YYYY-MM-DD-hh-mm-ss");
    const csvExporter = new ExportToCsv(options);
    const result = [];
    dataRows.forEach((r) => {
      let newData = {};
      headers.forEach((h) => {
        newData[h.headerName] = r[h.field];
      });
      result.push(newData);
    });
    if (!result.length) {
      let temp = {};
      headers.forEach((h) => {
        temp[h.headerName] = null;
      });
      result.push(temp);
    }
    csvExporter.generateCsv(result);
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
            Nội dung tải về sẽ được lưu dưới dạng (.csv). Bạn có thể mở bằng excel để xem tiện hơn
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
