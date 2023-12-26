import styled from "@emotion/styled";
export const Input = styled.input`
  text-align: center;
  width: 200px;
  height: 40px;
  background-color: red;
  border: none;
  caret-color: transparent;
  cursor: pointer;
  :focus {
    background-color: green;
    outline: none;
  }
`;