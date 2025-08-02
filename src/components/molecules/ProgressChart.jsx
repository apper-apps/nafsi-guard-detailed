import React from "react";
import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const ProgressChart = ({ data = [] }) => {
  // Process data for the chart
  const chartData = data.slice(-14).map(item => ({
    x: new Date(item.date).toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric" 
    }),
    y: item.urgeCount
  }));

  const options = {
    chart: {
      type: "area",
      height: 300,
      toolbar: { show: false },
      sparkline: { enabled: false }
    },
    theme: {
      mode: "light"
    },
    colors: ["#1B5E3F"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        type: "vertical",
        colorStops: [
          { offset: 0, color: "#1B5E3F", opacity: 0.8 },
          { offset: 100, color: "#1B5E3F", opacity: 0.1 }
        ]
      }
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    grid: {
      show: true,
      borderColor: "#f1f5f9",
      strokeDashArray: 3
    },
    xaxis: {
      type: "category",
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 500,
          colors: "#64748b"
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 500,
          colors: "#64748b"
        }
      },
      title: {
        text: "Urges per Day",
        style: {
          fontSize: "12px",
          fontWeight: 600,
          color: "#374151"
        }
      }
    },
    tooltip: {
      theme: "light",
      style: {
        fontSize: "12px"
      },
      y: {
        formatter: (value) => `${value} urge${value !== 1 ? "s" : ""}`
      }
    },
    dataLabels: { enabled: false }
  };

  const series = [{
    name: "Daily Urges",
    data: chartData
  }];

  const totalUrges = data.reduce((sum, item) => sum + item.urgeCount, 0);
  const avgUrges = data.length > 0 ? (totalUrges / data.length).toFixed(1) : 0;
  const cleanDays = data.filter(item => item.cleanDay).length;

  return (
    <Card variant="elevated">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg text-gray-800">
          14-Day Progress
        </h3>
        <ApperIcon name="TrendingUp" size={24} className="text-primary-600" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          className="text-center p-3 bg-gray-50 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-2xl font-bold text-gray-900 mb-1">{totalUrges}</div>
          <p className="text-xs text-gray-600 font-medium">Total Urges</p>
        </motion.div>

        <motion.div
          className="text-center p-3 bg-primary-50 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-2xl font-bold text-primary-600 mb-1">{avgUrges}</div>
          <p className="text-xs text-gray-600 font-medium">Avg/Day</p>
        </motion.div>

        <motion.div
          className="text-center p-3 bg-success/10 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-2xl font-bold text-success mb-1">{cleanDays}</div>
          <p className="text-xs text-gray-600 font-medium">Clean Days</p>
        </motion.div>
      </div>

      {chartData.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={300}
          />
        </motion.div>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <ApperIcon name="BarChart3" size={48} className="mx-auto mb-4 opacity-50" />
            <p>No data available yet</p>
            <p className="text-sm">Start logging urges to see your progress</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProgressChart;