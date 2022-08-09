import styled from "styled-components";

const HomePageSection = styled.section`
  height: 100vh;
  background-color: #183333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomePageWrapper = styled.div`
  flex-grow: 1;
  max-height: 100vh;
  max-width: 1400px;
  display: grid;
  grid-template: 50px calc(90vh - 50px) / 1fr 3fr 2fr;
  gap: 20px;

  & > div {
    border-radius: 10px;
  }
`;

const HomeHeader = styled.header`
  grid-column: 1/4;
  grid-row: 1/2;
  box-shadow: 0px 0px 2px 1px #6b9080;
  background-color: #cce3de;
  padding: 5px;
  border-radius: 10px;
  display:flex;
  align-items: center;
  justify-content: right;

  & > button {
    background-color: #183333;
    color: #fff;

    &:hover:not([disabled]){
      background-color: #457353;
    }
  }
`;

const ActiveRoomsWrapper = styled.div`
  box-shadow: 0px 0px 2px 1px #6b9080;
  background-color: #cce3de;
  padding: 10px;

  & > h3 {
    color: #000000;
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 15px;
  }
`;

const Wrapper = styled.div`
  padding: 20px;
  box-shadow: 0px 0px 2px 1px #6b9080;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  HomeHeader,
};
