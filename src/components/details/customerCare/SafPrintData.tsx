/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "antd";
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

        <div className="bg-gray-100 p-4">
          <div className="max-w-4xl mx-auto bg-white shadow-lg p-4">
            {/* <!-- Company Name --> */}
            <div className="text-center border-b-4 pb-2">
              <h1 className="text-2xl font-bold">Maestro Solutions Ltd.</h1>
              <div className="text-center">
                <Divider plain style={{ borderTopColor: "black" }}></Divider>
                {/* <p>_</p> */}
                <p>27/1/B, Alamin Apon Heights, Road No. 3, Dhaka 1207</p>
                <Divider plain style={{ borderTopColor: "black" }}></Divider>
                <h1 className="text-xl font-bold">User Registration Form</h1>
                <Divider plain style={{ borderTopColor: "black" }}></Divider>
              </div>
            </div>

            {/* <!-- Company Info and Logo --> */}
            <div className="flex justify-between items-center py-2">
              <div>
                <p>Habiba Jahan</p>
                <p>Customer ID: 123-456-7890</p>
                <p>Customer Number: 123-456-7890</p>
                <p>NID/PP.No/IdNo: 123456</p>
              </div>
              <img src="path_to_logo.png" alt="NO PHOTO" className="h-20" />
            </div>
            <div className="text-center">
              <Divider plain style={{ borderTopColor: "black" }}></Divider>
            </div>

            {/* <!-- Owner Information --> */}
            <div className="text-center py-2">
              <p>Type Of Customer: Individual</p>
              <p>Fathers Name: aaaaa</p>
              <p>Mothers Name: a</p>
              <p>Spouses Name: a</p>
              <p>Email: a</p>
              <p>Contact Person: a</p>
              <p>Contact Number: a</p>
              <p>Alternate Mobile No: a</p>
              <p>Date of Birth: a</p>
              <p>Gender: a</p>
              <p>Occupation: a</p>
              <p>Connectivity Address: a</p>
              <p>Permanent Address: a</p>
            </div>

            {/* <!-- Signature Lines --> */}
            <div className="flex justify-between items-center pt-2">
              <div className="text-center">
                <Divider plain style={{ borderTopColor: "black" }}></Divider>
                {/* <p>_</p> */}
                <p>Authorized Signature</p>
              </div>
              <div className="text-center">
                <Divider plain style={{ borderTopColor: "black" }}></Divider>
                {/* <p>_</p> */}
                <p>Subscribers Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SafPrintData;
