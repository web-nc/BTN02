import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { toast } from "react-toastify";
import React from "react";

export default function ReviewDialog({ 
    openDialog,
    handleCloseDialog,
    sendReviewResult
}) {
    const formRef = React.useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = formRef.current;
        if (!form.updatedPoint.value || !form.teacherComment.value) {
            toast.error("Vui lòng nhập đủ thông tin!")
            return;
        }

        sendReviewResult(form.updatedPoint.value, form.teacherComment.value);
    }

    return (
        <Dialog open={openDialog}>
            <form ref={formRef} action="/" method="POST" onSubmit={handleSubmit}>
                <DialogTitle>Yêu cầu phúc khảo</DialogTitle>
                <DialogContent>
                    <TextField sx={{ marginTop: '10px' }}
                        autoFocus
                        required
                        name="updatedPoint"
                        label="Điểm sau khi chỉnh sửa"
                        type="number"
                        onChange={(e) => { e.target.value = Math.min(Math.max(e.target.value, 0), 100) }}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        required
                        margin="dense"
                        multiline
                        rows = {3}
                        name="teacherComment"
                        label="Nhận xét của giáo viên"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button type='submit'>Đồng ý</Button>
                    <Button onClick={handleCloseDialog}>Huỷ</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
