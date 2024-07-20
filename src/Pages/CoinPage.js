import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCryptoContext from "../contexts/CryptoContext";
import { SingleCoin } from "../api/api";
import CoinInfo from "../components/CoinInfo";
import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/Carousel";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useCryptoContext();

  const fetchCoins = async () => {
    const response = await fetch(SingleCoin(id));
    const data = await response.json();
    setCoin(data);
  };

  const theme = useTheme();

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "#66fcf1" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <Box
        sx={{
          width: "30%",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
          borderRight: "2px solid grey",
        }}
      >
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: "25px",
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: "60px",
            paddingBottom: "40px",
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {parse(coin?.description.en.split(". ")[0])}
        </Typography>

        <Box
          sx={{
            alignSelf: "start",
            padding: "30px",
            paddingTop: "20px",
            width: "100%",

            [theme.breakpoints.down("md")]: {
              display: "flex",
              justifyContent: "space-around",
              padding: "4px",
            },
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              alignItems: "center",
            },
            [theme.breakpoints.down("xs")]: {
              alignItems: "start",
            },
          }}
        >
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "25px",
                fontFamily: "Montserrat",
              }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "25px",
                fontFamily: "Montserrat",
              }}
            >
              Current price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "25px",
                fontFamily: "Montserrat",
              }}
            >
              Market cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </Box>
      </Box>
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
