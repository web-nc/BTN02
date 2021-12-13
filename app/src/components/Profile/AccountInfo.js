import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function AccountInfo() {
  const user = useSelector((state) => state.user);
  const userName =
    user.firstname || user.lastname
      ? user.firstname + " " + user.lastname
      : user.email;
  const color = () => {
    return {
      backgroundColor: "#4fbef3",
    };
  };
  return (
    <div className="container-profile__header">
      <div className="profile-avatar">
        <div className="avatar">
          <Avatar style={color()} sx={{ width: 50, height: 50 }}>
            {userName.split(" ").map((s) => s[0])}
          </Avatar>
        </div>
        <div className="name">
          <h3>{userName}</h3>
          <h5>Tài khoản cá nhân</h5>
        </div>
      </div>
      <Button
        variant="outlined"
        sx={{
          height: 30,
          width: 165,
          textTransform: "none",
          position: "absolute",
          top: 60,
          right: 20,
          backgroundColor: "#3498db",
          ":hover": { backgroundColor: "#0abde3" },
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "#ecf0f1" }}>
          Trở về trang chủ
        </Link>
      </Button>
    </div>
  );
}

export default AccountInfo;
