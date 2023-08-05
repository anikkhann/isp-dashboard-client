import { DeviceData } from "@/interfaces/DeviceData";
import React from "react";

interface PropData {
  item: DeviceData;
}

const DetailsDeviceData = ({ item }: PropData) => {
  console.log("item", item);
  const data = JSON.stringify(item);
  return (
    <>
      <div className="row">
        {/*  */}
        {data}
      </div>
    </>
  );
};

export default DetailsDeviceData;
