import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar, Button } from "@mui/material";
import { CryptoState } from "../../CryptContext";
import "./UserSideBar.css";
export default function UserSideBar() {
  const [state, setState] = useState({ right: false });
  const { user } = CryptoState();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const logOut = () => {}
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>

          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 39,
              cursor: "pointer",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="drawer-container">
              <div className="profile">
                <Avatar
                  className="picture"
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span className="sidebar-title">
                  {user.displayName || user.email}
                </span>
              </div>
              <Button variant="contained" className="logout" onClick={logOut}>
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
