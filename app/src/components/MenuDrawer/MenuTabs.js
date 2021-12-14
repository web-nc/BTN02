import React from "react";
import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const sectionMapping = {
  OWNER: "Đã tạo",
  TEACHER: "Đang cộng tác",
  STUDENT: "Đã tham gia",
};

const stringToColour = function (str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

export default function MenuTabs({ courses, role }) {
  const navigator = useNavigate();

  return courses.some((course) => course.role === role) ? (
    <React.Fragment>
      <Divider textAlign="left">
        <Typography variant="caption" color="GrayText">
          {sectionMapping[role]}
        </Typography>
      </Divider>
      <List>
        {courses.map(
          (course) =>
            course.role === role && (
              <ListItem button key={course._id} onClick={() => navigator(`/course/${course._id}/info`)}>
                <ListItemIcon>
                  <Avatar
                    children={course.briefName?.slice(0, 2)}
                    sx={{ backgroundColor: stringToColour(course.briefName), width: 32, height: 32, fontSize: "14px" }}
                  />
                </ListItemIcon>
                <ListItemText primary={<Typography noWrap={true} children={course.name} />} />
              </ListItem>
            )
        )}
      </List>
    </React.Fragment>
  ) : (
    <div />
  );
}
