import styled from "styled-components";

// @media screen and(min - width: ${({ theme }) => theme.breakpoints.md}px) {
//   margin - bottom: 32px;
// }

export const StyledAppRowContainer = styled.div`
  & .ant-row {
    & > .ant-col {
      margin-bottom: 10px;

      & .card-outer-title {
        font-size: ${({ theme }) => theme.font.size.lg};
        margin-bottom: 10px;
        font-weight: ${({ theme }) => theme.font.weight.bold};
        color: ${({ theme }) => theme.palette.text.primary};
      }

      .ant-form & {
        margin-bottom: 0;
      }
    }

    &.ant-form-item > .ant-col {
      margin-bottom: 0;
    }
  }
`;
