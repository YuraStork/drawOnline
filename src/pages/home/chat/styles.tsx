import styled from "styled-components";

type WrapperProps = {
  myMessage: boolean;
}
const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 10px;
  
  & > div:first-child > img{
    border-radius: 50%;
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
`
const Message = styled.div<WrapperProps>`
  flex-basis: 100%;
  padding: 5px;
  background-color: ${p=>p.myMessage ? "#0092b6" : "#3f6d78"};
  border-radius: 10px;


  & > h4{
    color: #ffc628;
  }
  & > p{
    margin-top: 5px;
    margin-left: 10px;
    color: #fff;
  }
`

export { Message, MessageWrapper };