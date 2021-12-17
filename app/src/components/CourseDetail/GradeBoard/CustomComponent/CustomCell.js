

import { Menu, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Badge } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import React from "react";

export default function GradeBoard({ 
    point,
    assignmentId,
    studentId,
    finalized,
    handleEditGrade,
    handleFinalizedGrade
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [newPoint, setNewPoint] = React.useState(point);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setOpenDialog(true);
        handleClose();
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handlePublish = () => {
        handleFinalizedGrade(assignmentId, studentId, point);
        handleClose();
    }

    const editSubmit = () => {
        handleEditGrade(assignmentId, studentId, newPoint, finalized);
        handleCloseDialog();
    };

    return (
        <div>
            {(finalized) ? point : (
                <Badge color="error" variant="dot">
                    <div style={{ lineHeight: '22px' }}>{point}</div>
                </Badge>
                )}
            
            <IconButton
                size='small'
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                    <ArrowDropDownIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit} sx={{color: 'gray'}}>
                    <EditIcon fontSize="small" sx={{marginRight: '10px'}}/>
                    Sửa điểm
                </MenuItem>
                {!finalized && 
                <MenuItem onClick={handlePublish} sx={{color: 'gray'}}>
                    <PublishIcon fontSize="small" sx={{ marginRight: '10px'}}/>
                    Công bố
                </MenuItem>
                }
            </Menu>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Sửa điểm</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    value={newPoint}
                    label="Điểm"
                    type="number"
                    fullWidth
                    onChange={(e) => {
                        if (e.target.value > 100) {
                            setNewPoint(100);
                        } else if (e.target.value < 0) {
                            setNewPoint(0);
                        } else
                        setNewPoint(e.target.value) 
                    }}
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Huỷ</Button>
                    <Button onClick={editSubmit}>Đồng ý</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
