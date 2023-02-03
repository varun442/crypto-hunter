import React, { useEffect, useState } from "react";
import "./News.css";
import ShareIcon from "@mui/icons-material/Share";
import _ from "underscore";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Button,
  CardActions,
  Pagination,
  LinearProgress,
} from "@mui/material";
const News = () => {
  const [news, setNews] = useState([]);
  const [sortType, setSortType] = useState("latest");
  const [items, setItems] = useState([]);
  const [activeButton, setActiveButton] = useState("latest");
  const [page, setPage] = useState(1);
  const baseURL = `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${process.env.REACT_APP_API_KEY}`;

  const fetchNews = async () => {
    const response = await fetch(baseURL);
    const data = await response.json();
    setNews(data);
    setItems(_.sortBy(data.articles, "publishedAt").reverse()); // set items with latest news
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchNews();
    // eslint-disable-next-line
  }, []);

  const latest = _.sortBy(news.articles, "publishedAt").reverse();
  const oldest = _.sortBy(news.articles, "publishedAt");

  const sortNews = (type) => {
    if (type === "latest") {
      setItems(latest);
      setSortType("oldest");
      setActiveButton(type);
    } else if (type === "oldest") {
      setItems(oldest);
      setSortType("latest");
      setActiveButton(type);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line
    sortNews(sortType);
    // eslint-disable-next-line
  }, []);

  // console.log(items);
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
  if (!items) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <div>
      <div className="sort-buttons">
        <Button
          className="btn btn-toggle1"
          style={{ backgroundColor: activeButton === "latest" ? "gold" : " " }}
          onClick={() => sortNews("latest")}
        >
          Latest News
        </Button>
        <Button
          className="btn btn-toggle2"
          style={{ backgroundColor: activeButton === "oldest" ? "gold" : " " }}
          onClick={() => sortNews("oldest")}
        >
          Oldest News
        </Button>
      </div>
      <div className="grid-container">
        {items.slice((page - 1) * 6, (page - 1) * 6 + 6).map((item) => {
          return (
            <div className="grid-item">
              <Card sx={{ width: 370, height: 450 }} key={item}>
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
                      <Typography>
                        {publishedTime(item?.publishedAt)}
                      </Typography>
                    </div>
                  </CardActions>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      <Pagination
        className="news-pagination"
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontColor:"gold"
        }}
        count={parseInt((items?.length / 10).toFixed(0), 10)}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
        
      />
    </div>
  );
};

export default News;
