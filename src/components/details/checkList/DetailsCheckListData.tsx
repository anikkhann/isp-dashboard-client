import { ChecklistData } from "@/interfaces/ChecklistData";
import React from "react";

interface PropData {
  item: ChecklistData;
}

const DetailsCheckListData = ({ item }: PropData) => {
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

export default DetailsCheckListData;
