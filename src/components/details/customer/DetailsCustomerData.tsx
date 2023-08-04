import { ClientData } from "@/interfaces/ClientData";
import React from "react";

interface PropData {
  item: ClientData;
}

const DetailsCustomerData = ({ item }: PropData) => {
  console.log("item", item);
  return <div>DetailsCustomerData</div>;
};

export default DetailsCustomerData;
