import { ClientData } from "@/interfaces/ClientData";
import React from "react";

interface PropData {
  item: ClientData;
}

const DetailsZoneData = ({ item }: PropData) => {
  console.log("item", item);
  return <div>DetailsClientData</div>;
};

export default DetailsZoneData;
