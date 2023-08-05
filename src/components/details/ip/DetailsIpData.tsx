import { IpData } from "@/interfaces/IpData";
import React from "react";

interface PropData {
  item: IpData;
}

const DetailsIpData = ({ item }: PropData) => {
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

export default DetailsIpData;
