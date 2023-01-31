import React from "react";
import "./Banner.css";
import { Container } from "@mui/material";

import Carousel from "./Carousel";
const Banner = () => {
  return (
    <div className="banner">
      <Container className="banner-content">
        <div className="tag-line">
          <h2 className="heading">Crypto Hunter</h2>
          <p className="subtitle">
            Get all Info Regarding Your Favourite Crypto Currency
          </p>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
