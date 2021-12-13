import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateOneCourse } from "../../../services/course";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import RichTextEditor from "../../Editor";

function EditInfoCourse({ id, name, details, briefName, handleUpdateCourse }) {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState("info");
  const [contentAlert, setContentAlert] = useState("Vui lòng chờ!");
  const [nameCourse, setNameCourse] = useState("");
  const [detailCourse, setDetailCourse] = useState();
  const [briefNameCourse, setBriefNameCourse] = useState("");
  const paperStyle = {
    width: "60%",
    margin: "30px auto",
    paddingBottom: "10px",
    paddingTop: "20px",
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    updateOneCourse(id, nameCourse, draftToHtml(convertToRaw(detailCourse.getCurrentContent())), briefNameCourse)
      .then((res) => {
        setNotification("success");
        setContentAlert("Cập nhật thành công!");

        handleUpdateCourse(res.data.payload);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          // console.log(error.response.data.message);

          setNotification("error");
          setContentAlert("Bạn không có quyền cập nhật!");
        }
      });

    setOpen(true);
  };

  useEffect(() => {
    setNameCourse(name);
    setBriefNameCourse(briefName);

    const contentBlock = details && htmlToDraft(details);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setDetailCourse(editorState);
    }

    return () => {
      setDetailCourse();
    };
  }, [name, details, briefName]);

  return (
    <Paper elevation={10} style={paperStyle}>
      <Grid align="center">
        <Typography variant="h5" gutterBottom sx={{ marginLeft: 3 }}>
          Thông tin lớp học
        </Typography>
        <form method="post" className="update-course">
          <DialogContent>
            <TextField
              required
              variant="outlined"
              name="name"
              label="Tên môn học"
              color="primary"
              value={nameCourse}
              onChange={(e) => {
                setNameCourse(e.target.value);
              }}
              fullWidth
              margin="dense"
            />
            {/* <TextField
              variant="outlined"
              name="details"
              label="Details"
              color="primary"
              fullWidth
              margin="dense"
              value={detailCourse}
              onChange={(e) => {
                setDetailCourse(e.target.value);
              }}
            /> */}
            <TextField
              variant="outlined"
              name="briefName"
              label="Tên ngắn gọn"
              color="primary"
              fullWidth
              margin="dense"
              value={briefNameCourse}
              onChange={(e) => {
                setBriefNameCourse(e.target.value);
              }}
            />
            <RichTextEditor editorState={detailCourse} setEditorState={setDetailCourse} />
            <DialogActions className="btn-create-class">
              <Button
                disabled={nameCourse === ""}
                variant="text"
                type="submit"
                onClick={handleSubmit}
                sx={{
                  textTransform: "none",
                  marginTop: 2,
                  backgroundColor: "#3498db",
                  color: "#ecf0f1",
                  ":hover": { backgroundColor: "#0abde3" },
                }}>
                <span className="btn-create-class__context">Cập nhật</span>
              </Button>
              <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notification} sx={{ width: "100%" }}>
                  {contentAlert}
                </Alert>
              </Snackbar>
            </DialogActions>
          </DialogContent>
        </form>
      </Grid>
    </Paper>
  );
}

export default EditInfoCourse;
