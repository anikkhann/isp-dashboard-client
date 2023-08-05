import { SubscriptionData } from "@/interfaces/SubscriptionData";
import React from "react";

interface PropData {
  item: SubscriptionData;
}

const DetailsSubscriptionData = ({ item }: PropData) => {
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

export default DetailsSubscriptionData;
