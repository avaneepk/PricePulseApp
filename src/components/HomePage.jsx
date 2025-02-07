import { Box, Typography, Divider, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [currentPrice, setCurrentPrice] = useState(0.0);
  const [priceDesc, setPriceDesc] = useState("");

  const fetchCurrentPrice = async () => {
    const start = new Date();

    try {
      const response = await fetch(
        `https://sahkotin.fi/prices?fix&vat&start=${start.toISOString()}`
      );
      const data = await response.json();

      const price = (data.prices[0].value / 10).toFixed(2);

      if (price < 5) {
        setPriceDesc("Now's a great time to use electricity!");
      } else if (price < 10) {
        setPriceDesc("Prices are average at the moment.");
      } else {
        setPriceDesc("Careful! Prices are high at the moment.");
      }

      setCurrentPrice(price);
    } catch (error) {
      console.error("Error fetching price data:", error);
    }
  };

  useEffect(() => {
    fetchCurrentPrice();
  }, []);

  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundImage: "linear-gradient(to bottom, #21BF73, #12663E)",
      }}
    >
      <Box
        sx={{
          height: "8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: 400,
          }}
        >
          PricePulse
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "1rem",
        }}
      >
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: 500,
            color: "#1D7400",
          }}
        >
          {currentPrice} c/kWh
        </Typography>

        <Typography
          sx={{
            fontSize: 16,
            color: "gray",
            marginTop: "0.5rem",
          }}
        >
          {priceDesc}
        </Typography>

        <Divider sx={{ margin: "1rem 0" }} />

        <Link to="/chart">
          <Button
            sx={{
              width: "100%",
              backgroundColor: "#21BF73",
              color: "white",
              fontSize: 18,
              "&:hover": { backgroundColor: "#12663E" },
              textTransform: "none",
            }}
          >
            Go to chart page →
          </Button>
        </Link>
      </Box>
      <br></br>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          designlayout: "flex",
          padding: "1rem",
          height: "3rem",
        }}
      >
        <Link to="/appliances">
          <Button
            sx={{
              width: "100%",
              backgroundColor: "#21BF73",
              align: "center",
              color: "white",
              fontSize: 18,
              "&:hover": { backgroundColor: "#12663E" },
              textTransform: "none",
            }}
          >
            Go to Appliances →
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default HomePage;
