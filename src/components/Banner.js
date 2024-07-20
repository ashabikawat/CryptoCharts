import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <Box>
      <Container
        sx={{
          height: "40%",
          display: "flex",
          flexDirection: "column",
          padding: 3,
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#66fcf1",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          Crypto Charts
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: "darkgrey",
            textAlign: "center",
            textTransform: "capitalize",
            fontFamily: "Montserrat",
          }}
        >
          Visualizing the Future of Finance
        </Typography>
        <Carousel />
      </Container>
    </Box>
  );
};

export default Banner;
