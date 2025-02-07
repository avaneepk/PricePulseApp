import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = (props) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Time (Hours)",
          font: {
            size: 14,
          },
          color: "black",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.3)",
        },
        ticks: {
          color: "black",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (c / kWh)",
          font: {
            size: 14,
          },
          color: "black",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.3)",
        },
        ticks: {
          color: "black",
        },
      },
    },
  };

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Price data",
        data: props.data,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(56, 154, 24)",
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: "5px",
      }}
    >
      <Line options={options} data={data} />
    </Box>
  );
};

export default Chart;
