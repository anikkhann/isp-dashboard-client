import React from "react";

import { StyledAppLogo } from "./index.styled";
import AppImage from "@/lib/AppImage";

const AppLogo = () => {
  return (
    <StyledAppLogo>
      <AppImage src="/assets/logo.png" alt="logo" />
    </StyledAppLogo>
  );
};

export default AppLogo;
