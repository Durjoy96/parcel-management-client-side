import LoadingScreen from "@/components/custom/Loading/LoadingScreen";
import AxiosSecure from "@/hooks/AxiosSecure/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Chart from "react-apexcharts";

const Statistics = () => {
  const useAxios = AxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await useAxios.get(`/parcels`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const parcelDates = parcels.map((parcel) => parcel.bookingDate);
  const parcelCounts = parcelDates.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(parcelCounts);
  const dataSeries = Object.values(parcelCounts);

  const chartOptions = {
    chart: {
      id: "parcel-bar",
    },
    xaxis: {
      categories: categories,
    },
  };

  const seriesData = [
    {
      name: "Parcels Count",
      data: dataSeries,
    },
  ];

  return (
    <div className="app">
      <h2 className="text-xl md:text-2xl font-semibold text-primary border-b pb-3">
        Parcel Statistics
      </h2>
      <div className="mixed-chart mt-6">
        <Chart
          options={chartOptions}
          series={seriesData}
          type="bar"
          width="600"
          height="400"
        />
      </div>
    </div>
  );
};

export default Statistics;
