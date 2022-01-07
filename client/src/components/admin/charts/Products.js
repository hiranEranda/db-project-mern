import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { FlagContext } from "../AdminHome.js";

function Products() {
  const [name, setName] = useState([]);
  const [complaints, setComplaints] = useState([]);

  const flags = useContext(FlagContext);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  var firstDay = new Date(curr.setDate(first)).toUTCString();
  var lastDay = new Date(curr.setDate(last)).toUTCString();

  const getStats = (data) => {
    // counting the number of complaints for a particular product
    var res = Object.values(
      data.reduce((a, { product }) => {
        a[product] = a[product] || { product, count: 0 };
        a[product].count++;
        return a;
      }, Object.create(null))
    );

    // mapping out the product names to a separate array
    const productName = res.map((element, index) => {
      return element.product;
    });
    setName(productName);

    // mapping out the number of complaints to a separate array
    const totalComplaints = res.map((element, index) => {
      return element.count;
    });
    setComplaints(totalComplaints);
  };

  useEffect(() => {
    var curr = new Date(); // get current date
    var date = convert(curr);
    axios
      .get(`http://localhost:5000/api/admin/allcomplaints`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        if (flags.today) {
          var reduced = res.data.reduce(function (filtered, comp) {
            if (comp.complaint_date === date) {
              var newData = comp;
              filtered.push(newData);
            }
            return filtered;
          }, []);
          // console.log(reduced);
          getStats(reduced);
        }
        if (flags.week) {
          let startDate = convert(firstDay);
          let endDate = convert(lastDay);
          var reduced = res.data.reduce(function (filtered, comp) {
            if (
              comp.complaint_date > startDate &&
              comp.complaint_date < endDate
            ) {
              var newData = comp;
              filtered.push(newData);
            }
            return filtered;
          }, []);
          // console.log(reduced);
          getStats(reduced);
        }
        if (flags.month) {
          const split = date.split("-");
          var reduced = res.data.reduce(function (filtered, comp) {
            const split2 = comp.complaint_date.split("-");

            if (split[0] === split2[0] && split[1] === split2[1]) {
              console.log("match");
              var newData = comp;
              filtered.push(newData);
            }
            return filtered;
          }, []);
          getStats(reduced);
        }
        if (flags.all) {
          getStats(res.data);
        }
      })
      .catch((e) => console.log(e));
  }, [flags, firstDay, lastDay]);

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
              text: "Top 10 products got complained",
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

export default Products;
