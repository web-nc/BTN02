import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuTabs from "./MenuTabs";

export default function MenuDrawer() {
  const [state, setState] = useState(false);
  const navigator = useNavigate();
  const courses = useSelector((state) => state.courses.items);

  const toggleDrawer = () => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState(!state);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}>
      <List>
        <ListItem button onClick={() => navigator("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Trang chủ"} />
        </ListItem>
      </List>

      <MenuTabs courses={courses} role={"OWNER"} />
      <MenuTabs courses={courses} role={"TEACHER"} />
      <MenuTabs courses={courses} role={"STUDENT"} />
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer()} size="large" edge="start" color="inherit">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={state} onClose={toggleDrawer()}>
        {list("left")}
      </Drawer>
    </div>
  );
}
