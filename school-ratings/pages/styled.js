import styled from "styled-components";

export const TitleStyled = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
`;

export const TitleLinkStyled = styled.a`
  color: #0070f3;
  text-decoration: none;

  & a:hover,
  & a:focus,
  & a:active {
    text-decoration: underline;
  }
`;