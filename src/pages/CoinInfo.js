import React, { useState, useEffect } from "react";
import { HistoricalChart } from "../components/Config/api";
import { CryptoState } from "../CryptContext";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import "./CoinInfo.css";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { chartDays } from "../components/Config/data";
import SelectButton from "./SelectButton";
const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const fetchData = async () => {
    const response = await fetch(HistoricalChart(coin.id, days, currency));
    const data = await response.json();
    setHistoricalData(data.prices);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currency, days]);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="info-container">
        {!historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                    : `${date.getHours()}:${date.getMinutes()}AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData.map((coin) => {
                    return coin[1];
                  }),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "GOLD",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}

        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => {
            return (
              <SelectButton
                key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            );
          })}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
