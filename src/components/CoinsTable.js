import React, { useEffect, useState, useCallback, useMemo } from "react";
import { CoinList } from "../api/api";
import useCryptoContext from "../contexts/CryptoContext";
import {
  Box,
  Container,
  createTheme,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Carousel";

// Retry function
const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else if (response.status === 429) {
        // Too Many Requests - Retry after delay
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
    }
  }
};

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { currency, symbol } = useCryptoContext();

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchWithRetry(CoinList(currency));
      console.log("Fetched Coins:", data);
      setCoins(data);
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    } finally {
      setLoading(false);
    }
  }, [currency]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const handleSearch = useCallback(() => {
    if (!Array.isArray(coins)) return [];
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(text.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(text.toLowerCase())
    );
  }, [coins, text]);

  const searchResults = useMemo(() => handleSearch(), [handleSearch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            margin: 8,
            fontFamily: "Montserrat",
            textTransform: "capitalize",
          }}
        >
          Cryptocurrency prices by market cap
        </Typography>
        <TextField
          label="Search crypto currency.."
          variant="outlined"
          sx={{ marginBottom: 10, width: "100%" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#66fcf1" }} />
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#66fcf1" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                      sx={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row?.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        key={row?.name}
                        sx={{
                          backgroundColor: "#16171a",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#131111",
                          },
                          fontFamily: "Montserrat",
                        }}
                        onClick={() => navigate(`/coins/${row.id}`)}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ display: "flex", gap: 15 }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          sx={{
            padding: 3,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "#66fcf1",
            },
          }}
          count={Math.ceil(searchResults.length / 10)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
