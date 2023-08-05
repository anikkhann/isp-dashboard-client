import { DistributionZoneData } from "@/interfaces/DistributionZoneData";
import React from "react";

interface PropData {
  item: DistributionZoneData;
}

const DetailsDistributionZoneData = ({ item }: PropData) => {
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

export default DetailsDistributionZoneData;
