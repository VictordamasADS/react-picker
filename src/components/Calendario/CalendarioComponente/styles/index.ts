import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #dedede;

  @media screen and (min-width: 600px) {
    width: 50%;
  }
`;
