import React, { useState } from "react";
import { IconButton, MenuItem, Menu, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import AddCourseDialog from "./AddCourseDialog";
import JoinCourseDialog from "./JoinCourseDialog";
import UserButton from "../../UserButton";

export default function RightComp() {
  const [isAddingOpen, setIsAddingOpen] = useState(false);
  const [isJoiningOpen, setIsJoiningOpen] = useState(false);
  const [classAnchorEl, setClassAnchorEl] = useState(null);

  const handleClassMenu = (event) => {
    setClassAnchorEl(event.currentTarget);
  };

  const handleCreateClass = () => {
    setIsAddingOpen(!isAddingOpen);
    handleClassClose();
  };

  const handleJoinClass = () => {
    setIsJoiningOpen(!isJoiningOpen);
    handleClassClose();
  };

  const handleClassClose = () => {
    setClassAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, flexBasis: 0, justifyContent: "end" }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleClassMenu}
          color="inherit">
          <AddIcon />
        </IconButton>
      </Box>
      
      <Menu
        id="menu-appbar"
        anchorEl={classAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(classAnchorEl)}
        onClose={handleClassClose}>
        <MenuItem onClick={handleJoinClass} sx={{color: 'gray'}}>
          <CreateNewFolderOutlinedIcon fontSize="small" sx={{marginRight: '10px'}} />
          Tham gia
        </MenuItem>
        <MenuItem onClick={handleCreateClass} sx={{color: 'gray'}}>
          <FiberNewOutlinedIcon fontSize="small" sx={{color: 'gray', marginRight: '10px'}} />
          Tạo mới
        </MenuItem>
      </Menu>

      <UserButton />

      <AddCourseDialog openDialog={isAddingOpen} handleDialogClose={() => setIsAddingOpen(!isAddingOpen)} />

      <JoinCourseDialog openDialog={isJoiningOpen} handleDialogClose={() => setIsJoiningOpen(!isJoiningOpen)} />
    </React.Fragment>
  );
}
