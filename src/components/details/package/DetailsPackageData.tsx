import { PackageData } from "@/interfaces/PackageData";
import React from "react";

interface PropData {
  item: PackageData;
}

const DetailsPackageData = ({ item }: PropData) => {
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

export default DetailsPackageData;
