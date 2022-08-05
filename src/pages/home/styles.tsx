import styled from "styled-components";

const HomePageSection = styled.section`
  height: 100vh;
  background-color: #343a40;
  display: flex;
  align-items: center;
`;

const HomePageWrapper = styled.div`
  max-width: 1400px;
  flex-basis: 100%;
  height: 80vh;
  display: flex;
  gap: 20px;
  margin: 0 auto;

  & > div {
    box-shadow: 0px 0px 2px 1px #e9ecef;
    border-radius: 10px;
  }
`;

const ActiveRoomsWrapper = styled.div`
  background-color: #646668;
  padding: 10px;
  flex-basis: 25%;
  & > h3 {
    color: #ffffff;
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 15px;
  }
`;

const Wrapper = styled.div`
  padding: 20px;
  flex-basis: 50%;
  background-color: #212529;
  & > div:last-child {
    margin-top: 20px;
  }
`;

const ChatWrapper = styled(ActiveRoomsWrapper)``;

const RoomWrapper = styled.div`
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
