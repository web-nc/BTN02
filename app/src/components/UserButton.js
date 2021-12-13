import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import FaceIcon from "@mui/icons-material/Face";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

export default function UserButton({ style }) {
  const dispatch = useDispatch();
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleUserMenu = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserClose();
    dispatch(logout());
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", ...style }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleUserMenu}
        color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={userAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(userAnchorEl)}
        onClose={handleUserClose}>
        <MenuItem
          onClick={() => {
            navigate("/user/u/profile");
            handleUserClose();
          }}
          sx={{ color: "gray" }}>
          <FaceIcon fontSize="small" sx={{ marginRight: "10px" }} />
          Thông tin
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: "gray" }}>
          <LogoutIcon fontSize="small" sx={{ color: "gray", marginRight: "10px" }} />
          Đăng xuất
        </MenuItem>
      </Menu>
    </Box>
  );
}
