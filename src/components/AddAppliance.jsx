import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";

const AddAppliance = ({ onAddAppliance }) => {
  const [applianceName, setApplianceName] = useState("");
  const [electricity, setElectricity] = useState(0);
  const [idealPrice, setIdealPrice] = useState(0);
  const navigate = useNavigate();

  const handleSave = () => {
    const applianceData = {
      applianceName,
      electricity,
      idealPrice,
    };

    onAddAppliance(applianceData);
    navigate("/appliances");
  };

  const handleCancel = () => {
    navigate("/appliances");
  };

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
            fontSize: "2rem",
          }}
        >
          Add New Appliance
        </Typography>
      </Box>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            type="text"
            align="center"
            placeholder="Appliance Name"
            onChange={(e) => setApplianceName(e.target.value)}
            style={{
              height: "3rem",
              width: "100%",
              textAlign: "center",
              fontSize: "1.5rem",
              backgroundColor: "#ffffff",
              color: "black",
              border: "0.25px rgb(0, 0, 0) solid",
              borderRadius: "5px",
              marginBottom: "1rem",
            }}
          />
          <input
            type="text"
            align="center"
            placeholder="Power (kW)"
            onChange={(e) => setElectricity(e.target.value)}
            style={{
              height: "3rem",
              width: "100%",
              textAlign: "center",
              fontSize: "1.5rem",
              backgroundColor: "#ffffff",
              color: "black",
              border: "0.25px rgb(0, 0, 0) solid",
              borderRadius: "5px",
              marginBottom: "1rem",
            }}
          />
          <input
            type="text"
            align="center"
            placeholder="Ideal price (c/kWh)"
            onChange={(e) => setIdealPrice(e.target.value)}
            style={{
              height: "3rem",
              width: "100%",
              textAlign: "center",
              fontSize: "1.5rem",
              backgroundColor: "#ffffff",
              color: "black",
              border: "0.25px rgb(0, 0, 0) solid",
              borderRadius: "5px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: "1rem",
            gap: "1rem",
          }}
        >
          <Button
            onClick={handleSave}
            sx={{
              backgroundColor: "#21BF73",
              color: "white",
              fontSize: "1rem",
              "&:hover": { backgroundColor: "#12663E" },
              borderRadius: "20px",
              border: "0px solid rgb(219, 219, 219)",
              textAlign: "center",
              width: "40%",
              textTransform: "none",
            }}
          >
            Save ✓
          </Button>
          <br></br>
          <Button
            onClick={handleCancel}
            sx={{
              backgroundColor: "rgb(188, 73, 73)",
              color: "white",
              fontSize: "1rem",
              "&:hover": { backgroundColor: "rgb(102, 19, 19)" },
              borderRadius: "20px",
              border: "0px solid rgb(219, 219, 219)",
              textAlign: "center",
              width: "40%",
              textTransform: "none",
            }}
          >
            Cancel ✗
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AddAppliance;
