import { ClientData } from "@/interfaces/ClientData";
import React from "react";

interface PropData {
  item: ClientData;
}

const DetailsRetailData = ({ item }: PropData) => {
  console.log("item", item);
  return <div>DetailsClientData</div>;
};

export default DetailsRetailData;
