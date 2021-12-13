import React, {useState} from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { leaveCourse } from "../../../services/course";
import { Button, IconButton, MenuItem, Menu, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

export default function TeacherAction({ id, owner = false }) {
  const dispatch = useDispatch();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      handleMenuClose();
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleConfirmLeave = () => {
    leaveCourse(id).then((res) => {
        console.log(res);
        if (res.status === 200) {
            dispatch({ type: "LEAVE_COURSE", payload: res.data.payload });
            toast.success(res.data.message);
        }
    }).catch((err) => {
        toast.error(err.response.data.message);
    });
    handleClose();
    handleMenuClose();
  }

  return (
    <div>
      <IconButton aria-label="settings" onClick={handleMenu}>
        <MoreVertIcon />
      </IconButton>
      
      <Menu
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}>
        <MenuItem component={Link} to={'/course/' + id + '/setting'} sx={{color: 'gray'}} >
          <ModeEditOutlinedIcon sx={{marginRight: '6px'}} />
          Chỉnh sửa
        </MenuItem>
        {!owner &&
          <MenuItem sx={{color: 'gray'}} onClick={handleClickOpen} >
          <MeetingRoomIcon sx={{marginRight: '6px'}} />
            Rời khỏi
        </MenuItem>
        }
      </Menu>

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
                Bạn sẽ không còn trong danh sách giáo viên của lớp này.
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
  