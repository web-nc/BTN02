import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import RichTextEditor from "../../Editor";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { createCourse } from "../../../services/course";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function FormDialog({ openDialog, handleDialogClose }) {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [details, setDetails] = useState();

  const handleClose = () => {
    handleDialogClose();
    formRef.current.reset();
    setDetails();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form["name"].value) {
      toast.warn("Trường tên không được trống!")
      return;
    }

    createCourse(
      form["name"].value,
      draftToHtml(convertToRaw(details.getCurrentContent())),
      form["briefName"].value
    ).then((res) => {
      dispatch({ type: "COURSES_INCREMENT", payload: res.data.payload });
    });
    handleDialogClose();
    formRef.current.reset();
    setDetails();
  };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <form ref={formRef} action="/" method="POST" onSubmit={handleSubmit}>
        <DialogTitle>Tạo lớp</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên lớp (không bỏ trống)"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
          />
          <TextField
            margin="dense"
            id="briefName"
            label="Chủ đề"
            type="text"
            fullWidth
            variant="outlined"
            name="briefName"
          />
          <RichTextEditor editorState={details} setEditorState={setDetails} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ bỏ</Button>
          <Button type="submit" onClick={handleSubmit}>
            Tạo
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
