import { CustomerData } from "@/interfaces/CustomerData";
import React from "react";

interface PropData {
  item: CustomerData;
}

const DetailsCustomerData = ({ item }: PropData) => {
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

export default DetailsCustomerData;
