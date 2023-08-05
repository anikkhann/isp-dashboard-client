import { ClientData } from "@/interfaces/ClientData";
import React from "react";

interface PropData {
  item: ClientData;
}

const DetailsClientData = ({ item }: PropData) => {
  console.log("item", item);
  // convert to string
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

export default DetailsClientData;
