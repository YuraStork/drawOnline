import styled from "styled-components";

const CreateRoomWrapper = styled.div`
  flex-basis: 400px;
  flex-grow:1;
  background-color: #2274eebf;
  padding: 10px;

  & > form > div > input {
    width: 100%;
    height: 30px;
    margin-top: 10px;
  }
  & > form > button{
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
export { CreateRoomWrapper };
