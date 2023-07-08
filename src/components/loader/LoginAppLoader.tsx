import { Spin } from "antd";
import Image from "next/image";

const LoginAppLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          margin: "20px 0",
          padding: "20px 30px",
          textAlign: "center",
          background: "rgba(0, 0, 0, 0.05)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
          borderRadius: "4px",
          display: "inline-block",
          cursor: "wait"
        }}
      >
        <Image src="/assets/logo.png" width={40} height={50} alt="logo" />
        <Spin
          size="large"
          style={{
            marginTop: 10,
            marginBottom: 20,
            padding: "10px 20px"
          }}
        />
      </div>
    </div>
  );
};

export default LoginAppLoader;
