import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material";
import { ExportToCsv } from "export-to-csv";
import moment from "moment";

let options = {
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
    options.filename = "template_" + moment(new Date()).format("YYYY-MM-DD-hh-mm-ss");
    const csvExporter = new ExportToCsv(options);
    const data = indexCols.map((col) => ({
      studentId: col.studentId,
      studentName: col.studentName,
      point: "",
    }));
    if (!data.length) {
      data.push({ studentId: null, studentName: null, point: null });
    }
    csvExporter.generateCsv(data);
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Tải xuống mẫu nhập điểm">
        <Button onClick={handleClickOpen} variant="outlined" color="primary" sx={{ textTransform: "none" }}>
          <span style={{ marginRight: "0.25rem", fontWeight: "bold" }}>Tải Template</span>
          <FileDownloadIcon />
        </Button>
      </Tooltip>
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
