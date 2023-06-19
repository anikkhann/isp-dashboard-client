/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Alert, Form, Input } from "antd";

import {
  SignInButton,
  StyledSign,
  StyledSignContent,
  StyledSignForm
} from "./index.styled";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import LoginAppLoader from "@/components/loader/LoginAppLoader";
import { useAppDispatch } from "@/store/hooks";
// import axios from "axios";
import AppAxios from "@/services/AppAxios";

const LoginComponent = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const [showError, setShowError] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<any>([]);

  const { returnUrl } = router.query;

  const dispatch = useAppDispatch();

  const signInUser = async (values: any) => {
    const { email, password } = values;
    setLoading(true);

    try {
      AppAxios.post("/api/v1/auth/authenticate", {
        email: email,
        password: password
      })
        .then(async response => {
          const { data } = response;

          console.log(data);
          if (data.success === false) {
            setShowError(true);
            setErrorMessage(data.message);
            return;
          }

          Cookies.set("token", data.token);

          dispatch({ type: "auth/setIsLoggedIn", payload: true });

          setLoading(false);
          if (returnUrl) {
            router.replace(returnUrl as string);
          } else {
            router.replace("/admin");
          }
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          setShowError(true);
          setErrorMessage(err.response.data.message);

          if (err.response.status === 400) {
            setErrorMessage(err.response.data.message);
          } else {
            setErrorMessage(["Something went wrong, please try again later"]);
          }
        });
    } catch (err) {
      console.log(err);
      setShowError(true);
      setErrorMessage(err);
    }

    // console.log("Success:");
    // return false;
  };

  const onFinishFailed = () => {
    console.log("Failed:");
  };

  return loading ? (
    <LoginAppLoader />
  ) : (
    <StyledSign>
      <StyledSignContent>
        <div>
          {showError &&
            errorMessage.length > 0 &&
            errorMessage.map((message: any, index: number) => (
              <Alert
                key={index}
                message={message}
                type="error"
                showIcon
                style={{ marginBottom: "10px" }}
              />
            ))}
        </div>

        <StyledSignForm
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
            email: "duronto",
            password: "hotspot@1234"
          }}
          onFinish={signInUser}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            className="form-field"
            rules={[
              {
                required: true,
                message: "Please input your Email!"
              }
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            className="form-field"
            rules={[
              {
                required: true,
                message: "Please input your Password!"
              }
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <div className="form-btn-field">
            <SignInButton type="primary" htmlType="submit">
              Login
            </SignInButton>
          </div>
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default LoginComponent;
