import styled from "styled-components";

const AuthSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(p) => p.theme.colors.light_gray};
  padding: 10px;
  background-color: #f0f2f5;
  gap: 40px;
  & > h1 {
    text-align: right;
  }
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  width: 400px;
  border: 1px solid ${(p) => p.theme.colors.light_gray};
  box-shadow: 0px 0px 2px 0px #989898;

  & > a {
    width: max-content;
    display: inline-block;
    padding: 10px 5px;
    transition: all 0.3s;
    border-bottom: 2px solid transparent;

    &:hover {
      border-color: ${(p) => p.theme.colors.link};
    }
  }
`;
const Form = styled.form``;

export { AuthSection, Form, FormWrapper };
