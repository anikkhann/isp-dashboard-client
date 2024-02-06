import MainCard from "@/components/dashboard/MainCard";
import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";
import { Can } from "@/services/guard/Can";
import { Col } from "antd";
import React from "react";

const MainDashboard = () => {
  return (
    <>
      <AppAnimate>
        <AppRowContainer
          style={{
            height: "80vh",
            margin: "0 30px"
          }}
        >
          <Can I="client.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#0A8FDC"
                color="#fff"
                icon="/assets/images/icons/shopping-cart.png"
                title="Client Management"
                link="/admin/client"
              />
            </Col>
          </Can>

          <Can I="zone.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#49BD65"
                color="#fff"
                icon="/assets/images/icons/inventory.png"
                title="Zone In Charge"
                link="/admin/zone"
              />
            </Col>
          </Can>
          <Can I="subZone.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#9E49E6"
                color="#fff"
                icon="/assets/images/icons/trade.png"
                title="Sub Zone In Charge"
                link="/admin/sub-zone"
              />
            </Col>
          </Can>
          <Can I="retail.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#2F0F5D"
                color="#fff"
                icon="/assets/images/icons/accounting.png"
                title="Retail in Charge"
                link="/admin/retail"
              />
            </Col>
          </Can>
          <Can I="device.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#6D67E4"
                color="#fff"
                icon="/assets/images/icons/recruitment.png"
                title="Device Management"
                link="/admin/device"
              />
            </Col>
          </Can>
          <Can I="package.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#3795BD"
                color="#fff"
                icon="/assets/images/icons/group.png"
                title="Package Management"
                link="/admin/package"
              />
            </Col>
          </Can>
          <Can I="customer.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#3A1078"
                color="#fff"
                icon="/assets/images/icons/worker.png"
                title="Customer Management"
                link="/admin/customer"
              />
            </Col>
          </Can>
          <Can I="complaint.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#0EA293"
                color="#fff"
                icon="/assets/images/icons/letter.png"
                title="Complaint Management"
                link="/admin/complaint"
              />
            </Col>
          </Can>
          <Can I="user.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#216583"
                color="#fff"
                icon="/assets/images/icons/users-management.png"
                title="Users Management"
                link="/admin/user"
              />
            </Col>
          </Can>
          <Can I="topUp.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#216583"
                color="#fff"
                icon="/assets/images/icons/computer.png"
                title="Top-Up Management"
                link="/admin/top-up"
              />
            </Col>
          </Can>
          <Can I="customerCare.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#216583"
                color="#fff"
                icon="/assets/images/icons/computer.png"
                title="Customer Care"
                link="/admin/customer-care"
              />
            </Col>
          </Can>
          <Can I="notification.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#216583"
                color="#fff"
                icon="/assets/images/icons/computer.png"
                title="Notification Management"
                link="/admin/notification"
              />
            </Col>
          </Can>
          <Can I="payment.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#216583"
                color="#fff"
                icon="/assets/images/icons/computer.png"
                title="Payment Gateway"
                link="/admin/payment"
              />
            </Col>
          </Can>
          <Can I="accounting.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#216583"
                color="#fff"
                icon="/assets/images/icons/computer.png"
                title="Accounting & Billing"
                link="/admin/accounting"
              />
            </Col>
          </Can>
          <Can I="hotspot.dashboard">
            <Col xs={24} sm={12} md={6}>
              <MainCard
                bgColor="#216583"
                color="#fff"
                icon="/assets/images/icons/computer.png"
                title="Wi-Fi Hotspot"
                link="/admin/hotspot"
              />
            </Col>
          </Can>
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default MainDashboard;
