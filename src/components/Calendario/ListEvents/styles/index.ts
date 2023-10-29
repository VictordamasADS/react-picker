import styled from "styled-components";

export const Container = styled.div`
  min-height: 20rem;
  max-height: 20rem;
  flex-direction: column;
  width: 90%;
  gap: 1rem;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  overflow-y: scroll;

  @media screen and (min-width: 600px) {
    width: 50%;
  }
`;

export const Field = styled.div`
  width: 100%;
  padding: 2rem;
  max-height: 10rem;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dedede;
  align-items: flex-start;
  padding-bottom: 1rem;

  @media screen and (min-width: 600px) {
    padding: 0rem;
    padding-bottom: 1rem;
  }
`;

export const Header = styled.div`
  width: 100%;
  padding: 2rem;
  max-height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 1rem;

  @media screen and (min-width: 600px) {
    padding: 0rem;
  }
`;
