import styled from "styled-components";

export const StyledChartContainerView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const StyledChartContainer = styled.div`
  margin-bottom: 36px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxl}px) {
    margin-bottom: 32px;
  }
`;

export const StyledChartContainerAction = styled.div`
  display: flex;
  justify-content: center;
  background-color: "#555555";
`;

export const StyledChartActionItem = styled.div`
  display: flex;
  align-items: center;

  &:first-child {
    margin-right: 24px;
  }

  & p {
    margin-bottom: 0;
  }

  & .dot {
    height: 10px;
    width: 10px;
    margin-right: 8px;
  }
`;
