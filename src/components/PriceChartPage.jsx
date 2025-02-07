import {
  Box,
  Container,
  Typography,
  ButtonGroup,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import Chart from "./Chart";
import PriceTable from "./PriceTable";

const PriceChartPage = () => {
  const [priceData, setPriceData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedButton, setSelectedButton] = React.useState(0);

  const [chartData, setChartData] = React.useState([]);
  const [chartLabels, setChartLabels] = React.useState([]);

  const [tableRowData, setTableRowData] = React.useState([]);

  const buttonStyling = {
    backgroundColor: "#FFFFFF",
    color: "black",
    "&:hover": { backgroundColor: "#DEDEDE" },
    "&:focus": { outline: "none" },
  };

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
    updateChartData(priceData);
  };

  const updateChartData = (data) => {
    let slicedData;
    if (selectedButton === 0) {
      slicedData = data.slice(-13);
    } else if (selectedButton === 1) {
      slicedData = data.slice(-25);
    } else if (selectedButton === 2) {
      slicedData = data;
    }

    if (slicedData && slicedData.length > 0) {
      setChartData(slicedData.map((item) => item.value / 10.0)); // Prices are 10x for some reason
      setChartLabels(
        slicedData.map((item) => {
          const newDate = new Date(item.date);
          return newDate.getHours().toString();
        })
      );
    }
  };

  const updateTableData = (data) => {
    const slicedData = data.slice(-6);

    if (slicedData && slicedData.length > 0) {
      const tableRows = slicedData.map((item, index) => {
        const date = new Date(item.date);

        const day = date
          .toLocaleDateString("en-US", {
            weekday: "long",
          })
          .slice(0, 3);

        const time = `${date.getHours()}:00`;

        const change = item.value / data[43 + index - 1].value - 1.0;

        const price = item.value / 10.0;

        return {
          day: day,
          time: time,
          change: (change * 100).toFixed(2),
          price: price.toFixed(2),
        };
      });

      tableRows.reverse();
      setTableRowData(tableRows);
    }
  };

  const fetchData = async () => {
    const end = new Date();
    const start = new Date();
    start.setHours(start.getHours() - 48);

    try {
      const response = await fetch(
        `https://sahkotin.fi/prices?fix&vat&start=${start.toISOString()}&end=${end.toISOString()}`
      );
      const data = await response.json();

      setPriceData(data.prices);
      updateChartData(data.prices);
      updateTableData(data.prices);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching price data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (priceData.length > 0) {
      updateChartData(priceData);
      updateTableData(priceData);
    }
  }, [selectedButton, priceData]);

  // Loading screen
  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "linear-gradient(to top, #21BF73, #12663E)",
        }}
      >
        <CircularProgress color="primary" />
        <Typography
          sx={{
            marginTop: "1rem",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Loading Price Data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
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
          backgroundColor: "white",
          borderRadius: "5px",
        }}
      >
        <Typography
          sx={{
            color: "black",
            fontSize: 32,
            fontWeight: 400,
          }}
        >
          Price chart
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          borderRadius: "5px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonGroup variant="contained">
          <Button
            sx={{
              ...buttonStyling,
              backgroundColor: selectedButton === 0 ? "#99bda2" : "#FFFFFF",
            }}
            onClick={() => handleButtonClick(0)}
          >
            12 hrs
          </Button>
          <Button
            sx={{
              ...buttonStyling,
              backgroundColor: selectedButton === 1 ? "#99bda2" : "#FFFFFF",
            }}
            onClick={() => handleButtonClick(1)}
          >
            24 hrs
          </Button>
          <Button
            sx={{
              ...buttonStyling,
              backgroundColor: selectedButton === 2 ? "#99bda2" : "#FFFFFF",
            }}
            onClick={() => handleButtonClick(2)}
          >
            48 hrs
          </Button>
        </ButtonGroup>
      </Box>
      <Container sx={{ height: "250px" }}>
        <Chart labels={chartLabels} data={chartData}></Chart>
      </Container>
      <Container sx={{ width: "100%" }}>
        <PriceTable data={tableRowData}></PriceTable>
      </Container>
    </Box>
  );
};

export default PriceChartPage;
