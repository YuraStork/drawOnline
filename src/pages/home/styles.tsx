import styled from "styled-components";

const HomePageSection = styled.section`
background: rgb(18,200,66);
background: linear-gradient(162deg, rgba(18,200,66,1) 0%, rgba(0,177,255,1) 100%);`;

const HomePageWrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  height: 100vh;
  max-width: 800px;
  gap: 10px;
  margin: 0 auto;

  & > div {
    box-shadow: 0px 0px 2px 1px black;
  }
`;
export { HomePageSection, HomePageWrapper };
