import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import ChartPage from "./components/PriceChartPage";
import AppliancesPage from "./components/AppliancesPage";
import AddAppliance from "./components/AddAppliance";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 400,
          height: 800,
        }}
      >
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/*" element={<AppliancesPage />} />
          <Route path="/AddAppliance" element={<AddAppliance />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
        <Navbar></Navbar>
      </Box>
    </BrowserRouter>
  );
}

export default App;
