import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { leaveCourse } from "../../../services/course";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useDispatch } from "react-redux";
import React from "react";
import { toast } from "react-toastify";

export default function StudentAction({ id }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmLeave = () => {
        leaveCourse(id).then((res) => {
            if (res.status === 200) {
                dispatch({ type: "LEAVE_COURSE", payload: res.data.payload });
                toast.success(res.data.message);
            }
        }).catch((err) => {
            toast.error(err.response.data.message);
        });
        handleClose();
    }

    return (
        <div>
            <Tooltip title="Rời khỏi lớp học">
                <IconButton aria-label="Leave" onClick={handleClickOpen}>
                    <MeetingRoomIcon />
                </IconButton>
            </Tooltip>
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Bạn thực sự muốn rời khỏi lớp học?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn sẽ bị xóa tên khỏi lớp học này. 
                        Thông tin điểm số và các bài tập liên quan sẽ không được lưu lại.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Huỷ bỏ</Button>
                    <Button onClick={handleConfirmLeave} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
  }
  