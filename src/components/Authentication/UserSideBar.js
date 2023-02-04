import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar, Button } from "@mui/material";
import { AiFillDelete } from "react-icons/ai";
import { CryptoState } from "../../CryptContext";
import "./UserSideBar.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../CoinsTable";
import { doc, setDoc } from "firebase/firestore";

export default function UserSideBar() {
  const [state, setState] = useState({ right: false });
  const { user, setAlert, watchlist, coinList, symbol } = CryptoState();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull!",
    });

    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

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
                <div className="watchlist">
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coinList.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className="coin">
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
                </div>
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
