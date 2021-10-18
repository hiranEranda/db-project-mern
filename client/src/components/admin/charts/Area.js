import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

function Area() {
  const [name, setName] = useState([]);
  const [complaints, setComplaints] = useState([]);

  const chartData = {
    labels: name,
    datasets: [
      {
        label: "Complaint count",
        data: complaints,
        backgroundColor: [
          "rgba(192, 10, 45, 1)",
          "rgba(212, 23, 141, 0.9)",
          "rgba(25, 81, 24, 1)",
          "rgba(202, 235, 159, 0.7)",
          "rgba(82, 120, 114, 1)",
          "rgba(100, 32, 173, 0.5)",
          "rgba(104, 63, 177, 0.3)",
          "rgba(135, 124, 13, 0.3)",
          "rgba(74, 151, 251, 0.7)",
          "rgba(226, 195, 229, 0.2)",
        ],
      },
    ],
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/complaint/areas`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        // mapping out the product names to a separate array
        const location = res.data.map((element) => {
          return element.location;
        });
        setName(location);
        // mapping out the number of complaints to a separate array
        const totalComplaints = res.data.map((element) => {
          return element.complaints;
        });
        setComplaints(totalComplaints);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <Bar
        data={chartData}
        width={100}
        height={50}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Complaints from areas",
              padding: {
                bottom: 20,
              },
              font: {
                size: 20,
              },
            },
            legend: {
              display: false,
              position: "left",
            },
          },
        }}
      />
    </div>
  );
}

export default Area;
