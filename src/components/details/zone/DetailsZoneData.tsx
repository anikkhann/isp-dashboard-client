import { ClientData } from "@/interfaces/ClientData";
import React from "react";

interface PropData {
  item: ClientData;
}

const DetailsZoneData = ({ item }: PropData) => {
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

export default DetailsZoneData;
