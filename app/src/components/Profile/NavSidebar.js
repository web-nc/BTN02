import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";
import { Link } from "react-router-dom";

function NavSidebar({ choose }) {
  return (
    <nav aria-label="secondary mailbox folders" className="profile-nav">
      <ListItem sx={{ fontSize: 18, fontWeight: 650 }}>
        Cài đặt tài khoản
      </ListItem>
      <Divider />
      <List classes={{ selected: { backgroundColor: "red" } }}>
        <ListItem
          disablePadding
          selected={choose === "profile"}
          classes={{ selected: { backgroundColor: "red" } }}
        >
          <ListItemButton component={Link} to="/user/u/profile" style={{ textDecoration: "none", color: "black" }}>
              Thông tin chung
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding selected={choose === "password"}>
          <ListItemButton component={Link} to="/user/u/password" style={{ textDecoration: "none", color: "black" }}>
              Đổi mật khẩu
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
}

export default NavSidebar;
