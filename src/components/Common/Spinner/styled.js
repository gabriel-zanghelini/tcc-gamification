import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: grid;

  position: ${({ fixed }) => (fixed ? "fixed" : "relative")};

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  justify-items: center;
  align-items: center;
`;
