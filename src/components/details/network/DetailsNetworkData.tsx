import { IpSubnetData } from "@/interfaces/IpSubnetData";
import React from "react";

interface PropData {
  item: IpSubnetData;
}

const DetailsNetworkData = ({ item }: PropData) => {
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

export default DetailsNetworkData;
