import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import useCryptoContext from "../contexts/CryptoContext";
import { SingleCoin } from "../api/api";
import CoinInfo from "../components/CoinInfo";
import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/Carousel";

const CoinPage = () => {
  const { id } = useParams();
  const { currency, symbol } = useCryptoContext();
  const [coin, setCoin] = useState();

  const fetchCoin = useCallback(async () => {
    const response = await fetch(SingleCoin(id));
    const data = await response.json();
    setCoin(data);
  }, [id]);

  useEffect(() => {
    fetchCoin();
  }, [fetchCoin]);

  const theme = useTheme();

  const memoizedCoin = useMemo(() => coin, [coin]);

  if (!memoizedCoin)
    return <LinearProgress style={{ backgroundColor: "#66fcf1" }} />;

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
          src={memoizedCoin?.image?.large}
          alt={memoizedCoin?.name}
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
          {memoizedCoin?.name}
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
          {memoizedCoin?.description
            ? parse(memoizedCoin.description.en.split(". ")[0])
            : "Description not available"}
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
              {memoizedCoin?.market_cap_rank}
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
              {memoizedCoin?.market_data
                ? numberWithCommas(
                    memoizedCoin.market_data.current_price[
                      currency.toLowerCase()
                    ]
                  )
                : "N/A"}
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
              {memoizedCoin?.market_data
                ? numberWithCommas(
                    String(
                      memoizedCoin.market_data.market_cap[
                        currency.toLowerCase()
                      ]
                    ).slice(0, -6)
                  )
                : "N/A"}
              M
            </Typography>
          </span>
        </Box>
      </Box>
      <CoinInfo coin={memoizedCoin} />
    </Box>
  );
};

export default CoinPage;
