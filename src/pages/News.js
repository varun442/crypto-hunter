import React, { useEffect, useState } from "react";
import "./News.css";
import { baseURL } from "../components/Config/api";
import ShareIcon from "@mui/icons-material/Share";

import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
const News = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const response = await fetch(baseURL);
    const data = await response.json();
    setNews(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);
  const items = news?.articles;
  console.log(items);
  const publishedTime = (x) => {
    let publishedAt = "";
    let givenDate = new Date(x);
    let currentDate = new Date();
    var difference = currentDate - givenDate;
    var daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
    if (daysDifference >= 30) {
      var monthsDifference = Math.floor(daysDifference / 30);
      publishedAt = `${monthsDifference} months ago`;
    } else {
      publishedAt = `${daysDifference} days ago`;
    }
    return publishedAt;
  };
  if (!items) return <>Loading...</>;
  return (
    <div className="grid-container">
      {items.map((item) => {
        return (
          <div className="grid-item">
            <Card sx={{ width: 370, height: 450 }}>
              <div className="head">
                <a
                  style={{ color: "black" }}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item?.urlToImage}
                      alt={item?.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {/* {item?.title.length > 50
                      ? `${item.title.substring(0, 50)}...`
                      : item?.title} */}
                        {item?.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item?.description.length > 100
                          ? `${item.description.substring(0, 150)}...`
                          : item?.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </a>
              </div>

              <div className="footer">
                <CardActions>
                  <div className="share-button">
                    <Button
                      sx={{ color: "gold" }}
                      size="medium"
                      color="primary"
                    >
                      {" "}
                      <ShareIcon /> Share{" "}
                    </Button>
                  </div>
                  <div className="time">
                    <Typography>{publishedTime(item?.publishedAt)}</Typography>
                  </div>
                </CardActions>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default News;
