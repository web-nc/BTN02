import { MenuItem, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../services/user";
import CourseHomeNavBar from "../CourseHome/CourseHomeNavBar";
import AccountInfo from "./AccountInfo";
import NavSidebar from "./NavSidebar";

const genders = ["Nam", "Nữ", "Khác"];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Profile({ info }) {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState("info");
  const [contentAlert, setContentAlert] = useState("Vui lòng chờ!");
  const dispatch = useDispatch();

  const [studentID, setStudentID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genderUser, setGenderUser] = useState("");

  let statusID = false; // if studentID doesn't have value, user can fill
  if (info.studentID) {
    // opposite above
    statusID = true;
  }

  useEffect(() => {
    setStudentID(info.studentID);
    setFirstName(info.firstname);
    setLastName(info.lastname);
    setGenderUser(info.gender);
  }, [info.studentID, info.firstname, info.lastname, info.gender]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (statusID === false) {
      setNotification("error");
      setContentAlert("ID đã tồn tại!");
      setStudentID("");
    }
    updateProfile(studentID, firstName, lastName, genderUser).then((res) => {
      setNotification("success");
      setContentAlert("Cập nhật thành công!");
      dispatch({ type: "USER_UPDATE", payload: res.data });
    });
    setOpen(true);
  };
  return (
    <>
      <CourseHomeNavBar />
      <div className="container-profile">
        <AccountInfo />
        <div className="container-profile__main">
          <NavSidebar choose="profile" />
          <div className="form">
            <Typography variant="h6" sx={{ marginTop: 1, marginLeft: 2.5 }}>
              Thông tin cá nhân:
            </Typography>
            <form method="post" className="update-profile">
              <DialogContent>
                <TextField
                  required
                  disabled={statusID}
                  variant="outlined"
                  name="studentID"
                  label="ID Sinh viên"
                  color="primary"
                  value={studentID}
                  onChange={(e) => {
                    setStudentID(e.target.value);
                  }}
                  fullWidth
                  margin="normal"
                  helperText="ID Sinh viên duy nhất của bạn"
                />
                <TextField
                  disabled
                  variant="outlined"
                  name="email"
                  label="Email"
                  color="primary"
                  fullWidth
                  margin="normal"
                  value={info.email}
                />
                <TextField
                  variant="outlined"
                  name="firstname"
                  label="Họ"
                  color="primary"
                  fullWidth
                  margin="dense"
                  value={lastName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <TextField
                  variant="outlined"
                  name="lastname"
                  label="Tên"
                  color="primary"
                  fullWidth
                  margin="normal"
                  value={firstName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <TextField
                  variant="outlined"
                  name="gender"
                  label="Giới tính"
                  color="primary"
                  fullWidth
                  margin="normal"
                  value={genderUser}
                  select
                  onChange={(e) => {
                    setGenderUser(e.target.value);
                  }}
                >
                  {genders.map((gender, index) => (
                    <MenuItem key={index} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </TextField>
                <DialogActions className="btn-create-class">
                  <Button
                    variant="text"
                    type="submit"
                    onClick={handleSubmit}
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#3498db",
                      color: "#ecf0f1",
                      ":hover": { backgroundColor: "#0abde3" },
                    }}
                  >
                    <span className="btn-create-class__context">Cập nhật</span>
                  </Button>
                  <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity={notification}
                      sx={{ width: "100%" }}
                    >
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

export default Profile;
