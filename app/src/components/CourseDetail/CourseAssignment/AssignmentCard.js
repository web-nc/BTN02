import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";

function AssignmentCard({
  item,
  index,
  handleUpdateAssignment,
  handleDeleteAssignment,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [weight, setWeight] = useState(item.weight);
  
  const handleUpdate = () => {
    if (!name || !weight) {
      toast.info("Vui lòng nhập đủ thông tin!");
    }
    if (name===item.name && weight===item.weight) {
      toast.info("Vui lòng thay đổi thông tin!");
    }
    else {
      const data = {
        id: item._id, name, weight
      }
      handleUpdateAssignment(index, data).then(successful => {
        if (successful) {
          toast.success("Cập nhật thành công!");
        }
        else {
          toast.error("Cập nhật thất bại!");
        }
      });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    handleDeleteAssignment(index, { id: item._id }).then(successful => {
      if (successful) {
        toast.success("Xoá bài tập thành công!");
      }
      else {
        toast.error("Xoá bài tập thất bại!");
      }
    });
  }

  const handleEditModeChange = () => {
    if (isEditing) {
      setName(item.name);
      setWeight(item.weight);
    }
    setIsEditing(!isEditing);
  }

  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              display: "flex",
              userSelect: "none",
              padding: "16px 0 16px 16px",
              marginBottom: "6px",
              minHeight: "50px",
              backgroundColor: snapshot.isDragging ? "#bdc3c7" : "white",
              color: "white",
              ...provided.draggableProps.style,
            }}
          >
          <div style={{ width: "90%" }}>
            <TextField
              required
              InputProps={{
                readOnly: isEditing ? false : true,
              }}
              variant={isEditing ? "outlined" : "standard"}
              label="Tên"
              value={name}
              fullWidth
              margin="normal"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              required
              InputProps={{
                readOnly: isEditing ? false : true,
              }}
              variant={isEditing ? "outlined" : "standard"}
              label="Điểm"
              type="number"
              size="medium"
              fullWidth
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              margin="normal"
            />
          </div>
            <div
              style={{
                maxWidth: "70px",
                width: "10%",
                textAlign: "center",
                display: "block",
                verticalAlign: "middle",
                marginLeft: 10,
                marginRight: 5,
              }}
            >
              {!isEditing ? (
                <IconButton onClick={handleEditModeChange} sx={{ height: "50%", width: "100%" }}>
                  <EditIcon />
                </IconButton>
              ) : (
                <IconButton onClick={handleUpdate} sx={{ height: "50%", width: "100%", color: "#3498db"}}>
                  <SaveIcon />
                </IconButton>
              )}

              {!isEditing ? (
                <IconButton sx={{ height: "50%", width: "100%", color: "#e74c3c"}} onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
              ) : (
                <IconButton sx={{ height: "50%", width: "100%", color: "#3498db", }} onClick={handleEditModeChange}>
                    <CancelIcon />
                </IconButton>
              )}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default AssignmentCard;
