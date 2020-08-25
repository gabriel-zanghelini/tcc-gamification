import styled from "@emotion/styled";

export const Title = styled.h1`
  color: var(--black-highlight);
  font-weight: normal;
`;

export const SubTitle = styled.h2`
  color: var(--black-highlight);
  font-weight: normal;
`;

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
`;

export const Division = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--md-pad);
`;

export const Entry = styled.div`
  grid-column: span ${({ span }) => span || 1};
`;

export const Label = styled.span`
  color: var(--black-highlight);
  margin-right: var(--sm-pad);
`;
