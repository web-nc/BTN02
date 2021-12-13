import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOneCourse } from "../../../services/course";

function DeleteCourse({ id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paperStyle = {
    width: "60%",
    margin: "30px auto",
    paddingBottom: "10px",
    paddingTop: "20px",
  };
  const [notification, setNotification] = useState("info");
  const [contentAlert, setContentAlert] = useState("Vui lòng chờ!");
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const deleteCourse = () => {
    deleteOneCourse(id)
      .then((res) => {
        dispatch({ type: "COURSES_DECREMENT", payload: res.data.payload });
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          // console.log(error.response.data.message);
          setNotification("error");
          setContentAlert("Bạn không có quyền xóa!");
          setOpenAlert(true);
          setOpen(false);
        }
      });
  };
  return (
    <Paper
      elevation={10}
      style={paperStyle}
      sx={{ border: 1, borderColor: "red" }}
    >
      <Grid align="center">
        <Typography
          variant="h5"
          gutterBottom
          sx={{ marginLeft: 3, color: "red" }}
        >
          Xóa lớp học
        </Typography>
        <Button
          variant="text"
          sx={{
            width: 200,
            textTransform: "none",
            marginTop: 2,
            marginBottom: 2,
            backgroundColor: "#bdc3c7",
            color: "#e74c3c",
            ":hover": { backgroundColor: "#e74c3c", color: "#ecf0f1" },
          }}
          onClick={handleClickOpen}
        >
          <span className="btn-create-class__context">Xóa lớp học</span>
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Bạn chắc chắn muốn xóa lớp học?"}
          </DialogTitle>
          <DialogActions>
            <Button
              sx={{
                textTransform: "none",
                backgroundColor: "#3498db",
                color: "#ecf0f1",
                ":hover": { backgroundColor: "#0abde3" },
              }}
              onClick={handleClose}
            >
              Không
            </Button>
            <Button
              sx={{
                textTransform: "none",
                backgroundColor: "#bdc3c7",
                color: "#e74c3c",
                ":hover": { backgroundColor: "#e74c3c", color: "#ecf0f1" },
              }}
              onClick={deleteCourse}
              autoFocus
            >
              Có
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={notification}
            sx={{ width: "100%" }}
          >
            {contentAlert}
          </Alert>
        </Snackbar>
      </Grid>
    </Paper>
  );
}

export default DeleteCourse;
