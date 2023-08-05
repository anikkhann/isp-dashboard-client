import { DistributionPopData } from "@/interfaces/DistributionPopData";
import React from "react";

interface PropData {
  item: DistributionPopData;
}

const DetailsDistributionPopData = ({ item }: PropData) => {
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

export default DetailsDistributionPopData;
