import React from "react";
import {
  AppBar,
  Container,
  Select,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./Header.css";
import { CryptoState } from "../CryptContext";
import { Link } from "react-router-dom";
import AuthModal from "./Authentication/AuthModal";
import UserSideBar from "./Authentication/UserSideBar";
const Header = () => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const { currency, setCurrency, user } = CryptoState();
  // console.log(currency)
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="sticky">
          <Container>
            <Toolbar className="navbar">

              <Typography className="title">
                <Link to="/"> Crypto Hunter</Link>{" "}
              </Typography>

              <Typography className="news">
                <Link to="/news"> News</Link>
              </Typography>

              <Select
                variant="outlined"
                style={{ width: 100, height: 40, marginRight: 15 }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"INR"}>INR</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
              </Select>
              
              {user ? <UserSideBar /> : <AuthModal />}
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
