import React, { useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getCourses, joinCourse } from "../../../services/course";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function JoinCourseDialog({ openDialog, handleDialogClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();

  const handleClose = () => {
    handleDialogClose();
    formRef.current.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form["code"].value) {
      //message
      return;
    }

    joinCourse(form["code"].value)
      .then((res) => {
        console.log(res.status === 202);
        if (res.status === 200) {
          dispatch(async (dispatch) => {
            return getCourses().then((res) => {
              dispatch({ type: "COURSES_REFRESHED", payload: res.data.payload });
            });
          });
          toast.success("Tham gia lớp học thành công!");
          navigate("/course/" + res.data.payload._id + "/info");
        } else if (res.status === 202) {
          toast.warn(res.data.message);
        }
      })
      .catch((e) => {
        if (e.response) {
          // Request made and server responded
          console.log(e.response.data.message);
          console.log(e.response.status);
          console.log(e.response.headers);
        }
      });
    handleDialogClose();
    formRef.current.reset();
  };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <form ref={formRef} action="/" method="POST" onSubmit={handleSubmit}>
        <DialogTitle>Tham gia lớp</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            label="Mã (không bỏ trống)"
            type="text"
            fullWidth
            variant="standard"
            name="code"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ bỏ</Button>
          <Button type="submit" onClick={handleSubmit}>
            Vào
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
