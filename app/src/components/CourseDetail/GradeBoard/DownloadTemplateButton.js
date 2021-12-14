import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ExportToCsv } from "export-to-csv";
import moment from "moment";

const options = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  filename: "template_" + moment(new Date()).format("YYYY-MM-DD-hh-mm-ss"),
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
};

export default function DownloadTemplateButton({ indexCols }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const executeDownloadFile = () => {
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(
      indexCols.map((col) => ({
        studentId: col.studentId,
        studentName: col.studentName,
        grade: "",
      }))
    );
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined" color="primary" sx={{ textTransform: "none" }}>
        <span style={{ marginRight: "0.25rem", fontWeight: "bold" }}>Tải Template</span>
        <FileDownloadIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Xác nhận bạn muốn tải xuống mẫu nhập điểm?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nội dung tải về sẽ được lưu dưới dạng (.csv). Bạn có thể mở bằng excel để nhập điểm tiện hơn
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
