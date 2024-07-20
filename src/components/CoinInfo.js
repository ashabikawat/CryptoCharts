import React, { useEffect, useState } from "react";
import useCryptoContext from "../contexts/CryptoContext";
import { HistoricalChart } from "../api/api";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { chartDays } from "../api/data";
import SelectButton from "./SelectButton";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = useCryptoContext();

  const fetchHistoricData = async () => {
    const response = await fetch(HistoricalChart(coin.id, days, currency));
    const data = await response.json();

    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30px",
        padding: "40px",
        [theme.breakpoints.down("md")]: {
          width: "100%",
          marginTop: 0,
          padding: "20px",
          paddingTop: 0,
        },
      }}
    >
      {!historicData ? (
        <CircularProgress
          style={{ color: "#66fcf1" }}
          size={250}
          thickness={1}
        />
      ) : (
        <>
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( past ${days} Days in ${currency})`,
                  borderColor: "#66fcf1",
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

          <Box
            sx={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default CoinInfo;
