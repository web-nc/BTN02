import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";

export default function RequestDialog({ 
    openDialog,
    sendReviewRequest,
    handleDialogClose,
}) {
    const formRef = React.useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = formRef.current;
        if (!form.expectedPoint.value || !form.explanation.value) {
            toast.error("Vui lòng nhập đủ thông tin!")
        return;
        }
        sendReviewRequest(form.expectedPoint.value, form.explanation.value);
    }

    return (
        <Dialog open={openDialog}>
            <form ref={formRef} action="/" method="POST" onSubmit={handleSubmit}>
                <DialogTitle>Yêu cầu phúc khảo</DialogTitle>
                <DialogContent>
                    <TextField sx={{ marginTop: '10px' }}
                        autoFocus
                        name="expectedPoint"
                        label="Điểm mong muốn"
                        type="number"
                        onChange={(e) => { e.target.value = Math.min(Math.max(e.target.value, 0), 100) }}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        multiline
                        rows = {3}
                        name="explanation"
                        label="Nguyên nhân"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button type='submit' onClick={handleSubmit}>Đồng ý</Button>
                    <Button onClick={handleDialogClose} >Huỷ</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
