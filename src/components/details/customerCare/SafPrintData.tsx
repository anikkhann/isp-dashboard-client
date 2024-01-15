/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomerData } from "@/interfaces/CustomerData";
import React from "react";
interface PropData {
  item: CustomerData;
  safData: any;
  componentRef: any;
}

const SafPrintData = ({ componentRef, item, safData }: PropData) => {
  console.log("safData", safData);
  console.log("safData", item);
  return (
    <>
      <div ref={componentRef}>
        <h1
          style={{
            color: "#F15F22"
          }}
        >
          {safData.body.message}
        </h1>
      </div>
    </>
  );
};

export default SafPrintData;
