import React, { useEffect, useState } from "react";
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

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { currency, symbol } = useCryptoContext();

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const response = await fetch(CoinList(currency));
      const data = await response.json();
      console.log("Fetched Coins:", data);
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    if (!Array.isArray(coins)) return [];
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(text.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(text.toLowerCase())
    );
  };

  const searchResults = handleSearch();

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
            <LinearProgress sx={{ backgroundColor: "#66fcf1" }} />
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#66fcf1" }}>
                <TableRow
                  sx={{
                    backgroundColor: "#66fcf1",
                    cursor: "pointer",
                    fontFamily: "Montserrat",
                  }}
                >
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      sx={{
                        color: "black",
                        fontWeight: 700,
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
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
                    const profit = row.price_change_percentage_24h >= 0;
                    const marketCapStr = row?.market_cap
                      ? row.market_cap.toString()
                      : "";
                    const formattedMarketCap =
                      marketCapStr.length > 6
                        ? numberWithCommas(marketCapStr.slice(0, -6)) + "M"
                        : numberWithCommas(marketCapStr);

                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.id}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <img
                            src={row?.image}
                            alt={row?.name}
                            height="50"
                            sx={{ marginRight: 2 }}
                          />
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography
                              sx={{ textTransform: "uppercase", fontSize: 22 }}
                            >
                              {row?.symbol}
                            </Typography>
                            <Typography sx={{ color: "darkgrey" }}>
                              {row?.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row?.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: profit ? "green" : "red" }}
                        >
                          {profit && "+"}{" "}
                          {row?.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {formattedMarketCap}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={Math.ceil(handleSearch().length / 10)}
          page={page}
          onChange={(_, value) => setPage(value)}
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 2,
            backgroundColor: "#131111",
            "& .MuiPaginationItem-root": {
              color: "#66fcf1",
            },
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
