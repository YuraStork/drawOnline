import styled from "styled-components";

const HomePageSection = styled.section`
  background-color: #343a40;
  min-height: 100vh;
`;

const HomePageWrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 300px 1fr 300px;
  grid-template-rows: 700px;
 
  gap: 20px;
  padding: 10px;

  & > div {
    box-shadow: 0px 0px 2px 1px #e9ecef;
    border-radius: 10px;
  }
`;
const ActiveRoomsWrapper = styled.div`
  background-color: #6c757d;
  padding: 10px;

  & > h3 {
    color: #ffffff;
    font-weight: 400;
    font-size: 22px;
  }

  & > div {
    height: 40px;
    border: 2px solid #ffffff;
    color: #ffffff;
    margin-top: 10px;
    cursor: pointer;
    padding: 8px;
    font-size: 20px;
    transition: all 0.3s;

    &:hover {
      background-color: white;
      color: black;
    }
  }
  & > div:first-child {
    margin-top: 0;
  }
`;

const Wrapper = styled.div`
  padding: 10px;
  background-color: #212529;
  & > div:last-child {
    margin-top: 20px;
  }
`;

const ChatWrapper = styled(ActiveRoomsWrapper)``;

const RoomWrapper = styled.div`
  flex-basis: 400px;
  flex-grow: 1;
  padding: 10px;
  border-radius: 10px;

  & > h3 {
    font-weight: 400;
    font-size: 22px;
    color: #fff;
  }
  & > form > div > input {
    width: 100%;
    height: 30px;
    margin-top: 10px;
  }
  & > form > button {
    width: 200px;
    height: 30px;
    margin-top: 10px;
    background-color: white;
    cursor: pointer;
    outline: none;
    border: none;
    color: black;
  }
`;

export {
  HomePageSection,
  HomePageWrapper,
  ActiveRoomsWrapper,
  ChatWrapper,
  Wrapper,
  RoomWrapper,
};
