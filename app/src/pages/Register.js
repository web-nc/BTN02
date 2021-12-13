import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import RegisterForm from "../components/Auth/RegisterForm";

function Register() {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = {
    backgroundColor: "skyblue",
    height: "70px",
    width: "70px",
  };
  const iconStyle = { transform: "scale(2.2)" };
  const typoStyle = { marginLeft: "10px" };

  const location = useLocation();
  const from = location.state?.from || '/';
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <PersonSharpIcon style={iconStyle} />
          </Avatar>
          <h2>Đăng Ký</h2>
        </Grid>
        <RegisterForm />
        <Typography>
          {" "}
          Đã có tài khoản?
          <Link to="/login" state={{ from: from }} style={typoStyle}>
            Đăng nhập
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Register;
