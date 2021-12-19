import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { NavLink } from "react-router-dom";

export default function MidComp({ role }) {
  const classes = useStyles();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        flexBasis: 0,
        justifyContent: "center",
      }}
    >
      <NavLink end to="info" className={classes.navLink}>
        <Button color="inherit">Chi tiết</Button>
      </NavLink>
      {/* <NavLink end to="grades" className={classes.navLink}>
        <Button color="inherit">Grades</Button>
      </NavLink> */}
      <NavLink end to="people" className={classes.navLink}>
        <Button color="inherit">Mọi người</Button>
      </NavLink>
      {role && (role === "TEACHER" || role === "OWNER") && (
        <NavLink end to="assignment" className={classes.navLink}>
          <Button color="inherit">Cấu trúc điểm</Button>
        </NavLink>
      )}
      {role && (role === "TEACHER" || role === "OWNER") && (
        <NavLink end to="grade" className={classes.navLink}>
          <Button color="inherit">Bảng điểm</Button>
        </NavLink>
      )}
      {role && role === "STUDENT" && (
        <NavLink end to="studentGrade" className={classes.navLink}>
          <Button color="inherit">Bài tập</Button>
        </NavLink>
      )}
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  navLink: {
    color: "inherit",
    textDecoration: "none",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
}));
