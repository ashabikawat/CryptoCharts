import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCryptoContext from "../contexts/CryptoContext";

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency } = useCryptoContext();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              sx={{
                color: "#66fcf1",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
                flex: 1,
              }}
            >
              Crypto Charts
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginRight: 10 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
