import React from "react";
import { Microwave, Home, BarChart } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

function App() {
  const [value, setValue] = React.useState(1);
  const location = useLocation();

  const pathToValue = (path) => {
    switch (path) {
      case "/chart":
        return 0;
      case "/home":
        return 1;
      case "/appliances":
        return 2;
      default:
        return -1;
    }
  };

  React.useEffect(() => {
    setValue(pathToValue(location.pathname));
  }, [location.pathname]);

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ paddingY: "0.5rem" }}
      >
        <BottomNavigationAction
          label="Chart"
          icon={<BarChart />}
          component={Link}
          to="/chart"
        />
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          component={Link}
          to="/home"
        />
        <BottomNavigationAction
          label="Appliances"
          icon={<Microwave />}
          component={Link}
          to="/appliances"
        />
      </BottomNavigation>
    </Box>
  );
}

export default App;
