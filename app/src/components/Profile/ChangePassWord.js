import { Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { updatePassword } from "../../services/user";
import CourseHomeNavBar from "../CourseHome/CourseHomeNavBar";
import AccountInfo from "./AccountInfo";
import NavSidebar from "./NavSidebar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ChangePassWord({ isSocialAcc }) {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [contentAlert, setContentAlert] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  const clearState = () => {
    setOldPass("");
    setNewPass("");
    setConfirmNewPass("");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification("info");
    setContentAlert("Vui lòng điền đủ thông tin!");

    if (oldPass || newPass || confirmNewPass) {
      if (newPass !== confirmNewPass) {
        //message change fail
        setNotification("error");
        setContentAlert("Mật khẩu mới không trùng khớp!");
      } else if (newPass === "") {
      } else {
        setNotification("error");
        setContentAlert("Sai mật khẩu!");
        updatePassword(oldPass, newPass).then((res) => {
          //message change success
          setNotification("success");
          setContentAlert("Cập nhật thành công!");
        });
      }
    }
    setOpen(true);
    clearState();
  };
  return (
    <>
      <CourseHomeNavBar />
      <div className="container-profile">
        <AccountInfo />
        <div className="container-profile__main">
          <NavSidebar choose="password" />
          <div className="form">
            <Typography variant="h6" sx={{ marginTop: 1, marginLeft: 2.5 }}>
              Chỉnh sửa mật khẩu:
            </Typography>
            <form method="post" className="update-password">
              <DialogContent>
                <TextField
                  disabled={isSocialAcc}
                  id="outlined-password-input"
                  label="Mật khẩu hiện tại"
                  type="password"
                  name="currentPassword"
                  autoComplete="current-password"
                  value={oldPass}
                  margin="normal"
                  fullWidth
                  onChange={(e) => {
                    setOldPass(e.target.value);
                  }}
                />
                <TextField
                  disabled={isSocialAcc}
                  label="Mật khẩu mới"
                  value={newPass}
                  margin="normal"
                  fullWidth
                  type="password"
                  name="newPassword"
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                />
                <TextField
                  disabled={isSocialAcc}
                  label="Xác nhận mật khẩu mới"
                  value={confirmNewPass}
                  margin="normal"
                  fullWidth
                  type="password"
                  name="confirmPassword"
                  onChange={(e) => {
                    setConfirmNewPass(e.target.value);
                  }}
                />
                <DialogActions className="btn-create-class">
                  <Button
                    disabled={isSocialAcc}
                    variant="text"
                    type="submit"
                    onClick={handleSubmit}
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#3498db",
                      color: "#ecf0f1",
                      ":hover": { backgroundColor: "#0abde3" },
                    }}>
                    <span className="btn-create-class__context">Cập nhật</span>
                  </Button>
                  <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={notification} sx={{ width: "100%" }}>
                      {contentAlert}
                    </Alert>
                  </Snackbar>
                </DialogActions>
              </DialogContent>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassWord;
