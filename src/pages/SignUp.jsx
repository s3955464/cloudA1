import React, { useState } from "react";
import Form from "../components/Form";


function SignUp(props) {
  return (
    <div>
      <Form loginUser={props.loginUser} />
    </div>
  );
}

export default SignUp;
