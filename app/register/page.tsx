import React from "react";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import RegisterForm from "./RegisterForm";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Register = async () => {
  const currenUser = await getCurrentUser()
  return (
    <Container>
      <FormWrap> 
        <RegisterForm  currentUser={currenUser} />
      </FormWrap>
    </Container>
  );
};

export default Register;
