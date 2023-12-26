import styled from "@emotion/styled";

export const Container = styled.div<{ action: string }>`
  padding: 8px 16px;
  width: 100%;
  cursor: ${({ action }) => (action === "none" ? "default" : "pointer")};
`;
