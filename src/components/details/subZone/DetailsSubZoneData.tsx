import { ClientData } from "@/interfaces/ClientData";
import React from "react";

interface PropData {
  item: ClientData;
}

const DetailsSubZoneData = ({ item }: PropData) => {
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

export default DetailsSubZoneData;
