import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { NavLink } from "react-router-dom";
import UserButton from "../../UserButton";

export default function RightComp({ role }) {
  const style = { flexGrow: 1, flexBasis: 0, justifyContent: "end" };
  const classes = useStyles();
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexBasis: 0,
        justifyContent: "end",
      }}
    >
      {role && (role === "TEACHER" || role === "OWNER") && (
        <NavLink end to="setting" className={classes.navLink}>
          <Button color="inherit">
            <SettingsIcon />
          </Button>
        </NavLink>
      )}
      <UserButton style={style} />
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
    marginLeft: "100%",
  },
}));
