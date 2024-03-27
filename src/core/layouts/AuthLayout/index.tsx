import React from "react";
import PropTypes from "prop-types";
import {
  StyledAuth,
  StyledAuthCard,
  StyledAuthCardHeader,
  StyledAuthMainContent,
  StyledAuthWelContent,
  StyledAuthWellAction,
  StyledAuthWrap
} from "./AuthLayout.styled";
import AppLogo from "@/lib/AppLogo";

interface IAuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  return (
    <StyledAuth>
      <div>
        <StyledAuthWrap key={"wrap"}>
          <StyledAuthCard>
            <StyledAuthWellAction>
              <StyledAuthWelContent>
                <h2>Welcome to Your ISP Billing Center!</h2>
                <p>
                  Discover essential tools for managing subscriptions, analyzing
                  data, and optimizing your ISP billing experience seamlessly.
                </p>
              </StyledAuthWelContent>
            </StyledAuthWellAction>
            <StyledAuthMainContent>
              <StyledAuthCardHeader>
                <AppLogo />
              </StyledAuthCardHeader>
              {children}
            </StyledAuthMainContent>
          </StyledAuthCard>
        </StyledAuthWrap>
      </div>
    </StyledAuth>
  );
};

export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.node
};
