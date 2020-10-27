import styled from "@emotion/styled";

export const Title = styled.h1`
  color: var(--black-highlight);
  font-weight: normal;
  font-size: 36px;
`;

export const SubTitle = styled.h2`
  color: var(--black-highlight);
  font-weight: normal;
  font-size: 24px;
`;

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
`;

export const Division = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 18px;
`;

export const Entry = styled.div`
  grid-column: span ${({ span }) => span || 2};
`;

export const Label = styled.span`
  color: var(--black-highlight);
  margin-right: var(--sm-pad);
`;
