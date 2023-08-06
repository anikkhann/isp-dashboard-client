import { ComplainTypeData } from "@/interfaces/ComplainTypeData";
import React from "react";

interface PropData {
  item: ComplainTypeData;
}

const DetailsComplainTypeData = ({ item }: PropData) => {
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

export default DetailsComplainTypeData;
