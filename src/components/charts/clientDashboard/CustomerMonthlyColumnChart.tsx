/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AppLoader from "@/lib/AppLoader";

import dynamic from "next/dynamic";

const Column = dynamic(
  () => import("@ant-design/plots").then(({ Column }) => Column),
  { ssr: false }
);

interface Data {
  month: string;
  customer_count: number;
}

const CustomerMonthlyColumnChart = () => {
  const [items, SetItems] = useState<Data[]>([]);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`/api/dashboard/get-monthly-newCustomer`);
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["monthly-customer-list"],
    queryFn: async () => {
      const { data } = await fetchData();
      return data;
    },
    onSuccess(data: any) {
      if (data) {
        SetItems(data.body);
      }
    },
    onError(error: any) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    if (items) {
      SetItems(items);
    }
  }, [items]);

  const config: any = {
    data: items,
    xField: "month",
    yField: "customer_count",
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: "bottom",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.9
      }
    },
    meta: {
      month: {
        alias: "Month"
      },
      customer_count: {
        alias: "Customer Count"
      }
    }
  };

  return (
    <>
      {isLoading && isFetching && <AppLoader />}

      {isError && <div>{error.message}</div>}

      <Column {...config} />
    </>
  );
};

export default CustomerMonthlyColumnChart;
