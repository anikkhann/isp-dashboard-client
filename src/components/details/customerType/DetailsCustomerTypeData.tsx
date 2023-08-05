import { CustomerTypeData } from "@/interfaces/CustomerTypeData";
import React from "react";

interface PropData {
  item: CustomerTypeData;
}

const DetailsCustomerTypeData = ({ item }: PropData) => {
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

export default DetailsCustomerTypeData;
