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
  console.log("item", item);
  return (
    <>
      <div ref={componentRef}>
        {/* <h1
          style={{
            color: "#F15F22"
          }}
        >
          {safData.body.timestamp}
        </h1> */}

        <div className="bg-gray-100 p-4">
          <div className="max-w-4xl mx-auto bg-white shadow-lg p-4">
            {/* <!-- Company Name --> */}
            <div className="text-center border-b-4 pb-2">
              <h1 className="text-2xl font-bold">{item.client?.name}</h1>
              <div className="text-center">
                <Divider plain style={{ borderTopColor: "black" }}></Divider>
                {/* <p>_</p> */}
                <p>{item.client?.address}</p>
                <Divider plain style={{ borderTopColor: "black" }}></Divider>
                <h1 className="text-xl font-bold">User Registration Form</h1>
                <Divider plain style={{ borderTopColor: "black" }}></Divider>
              </div>
            </div>

            {/* <!-- Company Info and Logo --> */}
            <div className="flex justify-between items-center py-2">
              <div>
                <p>{safData.body.body.customer?.name}</p>
                <p>Customer ID: {item?.customerId}</p>
                <p>Customer Name: {safData.body.body.subscriberName}</p>
                <p>NID/PP.No/IdNo: {safData.body.body.identificationNo}</p>
              </div>
              <img src="path_to_logo.png" alt="NO PHOTO" className="h-20" />
            </div>
            <div className="text-center">
              <Divider plain style={{ borderTopColor: "black" }}></Divider>
            </div>

            {/* <!-- Owner Information --> */}
            <div className="text-center py-2">
              <p>Type Of Customer: {safData.body.body.typeofCustomer}</p>
              <p>Fathers Name: {safData.body.body.fatherName}</p>
              <p>Mothers Name: {safData.body.body.motherName}</p>
              <p>Spouses Name: {safData.body.body.spouseName}</p>
              <p>Email: {safData.body.body.email}</p>
              <p>Contact Person: {safData.body.body.contactPerson}</p>
              <p>Contact Number: {item.contactNumber}</p>
              <p>Alternate Mobile No: {safData.body.body.phoneNumber}</p>
              <p>Date of Birth: {safData.body.body.dateOfBirth}</p>
              <p>Gender: {safData.body.body.gender}</p>
              <p>Occupation: {safData.body.body.occupation}</p>
              <p>Connectivity Address: {safData.body.body.connectionAddress}</p>
              <p>Permanent Address: {safData.body.body.permanentAddress}</p>
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
