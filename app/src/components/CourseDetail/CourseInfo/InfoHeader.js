import React, { useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

export default function InfoHeader({ courseName, briefName, details }) {
  const classes = useStyles();
  const [dropDown, setDropDown] = useState(false);

  return (
    <Card sx={{ width: "inherit" }} className={classes.root}>
      <CardActionArea onClick={() => setDropDown(!dropDown)}>
        <CardMedia component="img" height="220" image="/static/images/banner.png" alt="green iguana" />
        <div className={classes.font}>
          <Typography gutterBottom variant="h4" color="white" component="div" textAlign="center" noWrap={true}>
            {courseName}
          </Typography>
          <Typography variant="h5" color="white" textAlign="center" display="block" noWrap={true}>
            {briefName}
          </Typography>
        </div>
      </CardActionArea>
      {dropDown && (
        <CardContent sx={{ maxHeight: "14rem", overflowY: "scroll" }}>
          <div dangerouslySetInnerHTML={{ __html: details }} />
        </CardContent>
      )}
    </Card>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
  },
  font: {
    position: "absolute",
    top: "35%",
    width: "100%",
    textAlign: "left",
    marginLeft: "0.5rem",
    color: "black",
    backgroundColor: "none",
    fontFamily: "Comic Sans MS",
  },
}));
