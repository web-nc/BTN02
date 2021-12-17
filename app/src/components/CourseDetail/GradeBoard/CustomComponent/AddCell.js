

import { IconButton, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";

export default function GradeBoard({ assignmentId, studentId, handleEditGrade }) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [newPoint, setNewPoint] = React.useState(0);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const editSubmit = () => {
        handleEditGrade(assignmentId, studentId, newPoint, false);
        handleCloseDialog();
    };

    const handleEdit = () => {
        setOpenDialog(true);
    }

    return (
        <div>
            <IconButton onClick={handleEdit}>
                <AddIcon />
            </IconButton>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Thêm điểm</DialogTitle>
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
