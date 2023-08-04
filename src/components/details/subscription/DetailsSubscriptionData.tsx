import { SubscriptionData } from "@/interfaces/SubscriptionData";
import React from "react";

interface PropData {
  item: SubscriptionData;
}

const DetailsSubscriptionData = ({ item }: PropData) => {
  console.log("item", item);
  return <div>DetailsSubscriptionData</div>;
};

export default DetailsSubscriptionData;
