import styled from "@emotion/styled";
interface KeyProps {
  isPressed?: boolean
}
const Key = styled.div<KeyProps>`
  background-color: ${({ isPressed }) => (isPressed ? "orange" : "white")};
  height: 40px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  margin-bottom: 4px;
  > :not(:first-child) {
    margin-left: 4px;
  }
`;

export const KeyS = styled(Key)`
  width: 40px;
`;

export const KeyM = styled(Key)`
  width: 62px;
`;

export const KeyL = styled(Key)`
  width: 84px;
`;

export const KeyXL = styled(Key)`
  width: 106px;
`;

export const KeyXXL = styled(Key)`
  width: 348px;
`;

export const Blank = styled(Key)`
  border: none;
`;
