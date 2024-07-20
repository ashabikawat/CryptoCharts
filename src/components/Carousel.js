import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useCryptoContext from "../contexts/CryptoContext";
import { TrendingCoins } from "../api/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const { currency, symbol } = useCryptoContext();

  const fetchTrending = async () => {
    const response = await fetch(TrendingCoins(currency));
    const data = await response.json();
    setTrending(data);
  };

  useEffect(() => {
    fetchTrending();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items =
    Array.isArray(trending) &&
    trending.map((trend) => {
      const profit = trend.price_change_percentage_24h >= 0;

      return (
        <Link
          to={`/coins/${trend.id}`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            padding: 16,
          }}
        >
          <img
            src={trend?.image}
            alt={trend.symbol}
            style={{
              height: "80px",
              marginBottom: "10px",
              borderRadius: "50%",
            }}
          />
          <Typography
            variant="body2"
            style={{
              textTransform: "uppercase",
              marginBottom: "5px",
            }}
          >
            {trend?.symbol} &nbsp;{" "}
            <span style={{ color: profit ? "green" : "red" }}>
              {profit && "+"} {trend?.price_change_percentage_24h.toFixed(2)}%
            </span>
          </Typography>

          <Typography
            variant="h6"
            style={{
              fontWeight: 500,
              fontSize: "22px",
            }}
          >
            {symbol} {numberWithCommas(trend?.current_price.toFixed(2))}
          </Typography>
        </Link>
      );
    });

  return (
    <Box
      sx={{
        height: "50%",
        display: "flex",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <AliceCarousel
        mouseTracking
        animationDuration={1000}
        autoPlay
        autoPlayInterval={2000}
        responsive={responsive}
        items={items}
        infinite
        disableDotsControls
        disableButtonsControls
      />
    </Box>
  );
};

export default Carousel;
