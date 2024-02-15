import { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js

const DoughnutChart = ({ data }) => {
  const chartContainer = useRef(null); // Reference to the canvas element
  const chartInstance = useRef(null); // Reference to the chart instance

  useEffect(() => {
    // Function to create the doughnut chart
    const createChart = () => {
      const ctx = chartContainer.current.getContext("2d"); // Get the canvas context
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "My Dataset",
              data: data.values,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              borderColor: "#11052c",
              hoverOffset: 4,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: "#11052c", // Change label color to white
              },
            },
          },
        },
      });
    };

    // Call the createChart function when the component mounts
    createChart();

    // Clean up by destroying the chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]); // Dependency array to watch for changes in the data prop

  return <canvas ref={chartContainer} width="400" height="400" />; // Render the canvas element
};

export default DoughnutChart;
