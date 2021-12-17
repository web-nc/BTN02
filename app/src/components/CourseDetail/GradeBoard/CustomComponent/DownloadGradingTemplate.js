import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from "@mui/material";
import XLSX from "xlsx";
import moment from "moment";

export default function DownloadGradingTemplate({ indexCols }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const executeDownloadFile = () => {
    const data = indexCols.map((col) => ({
      studentId: col.studentId,
      point: "",
    }));
    if (!data.length) {
      data.push({ studentId: null, point: null });
    }

    const headers = [["studentId", "point"]];
    //Had to create a new workbook and then add the header
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, headers);

    //Starting in the second row to avoid overriding and skipping headers
    XLSX.utils.sheet_add_json(ws, data, { origin: "A2", skipHeader: true });

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "grading_tp_" + moment(new Date()).format("YYYY-MM-DD-hh-mm-ss") + ".xlsx");

    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Tải xuống mẫu nhập điểm">
        <Button onClick={handleClickOpen} variant="outlined" color="primary" sx={{ textTransform: "none" }}>
          <span style={{ marginRight: "0.25rem", fontWeight: "bold" }}>Mẫu nhập điểm</span>
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
            Nội dung tải về sẽ được lưu dưới dạng (.xlsx). Bạn có thể mở bằng excel để nhập điểm tiện hơn
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
