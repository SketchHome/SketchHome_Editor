/*
 * Get Login token 
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { getTokens as userActions } from "../redux/modules/user";

const LoginMain = (props) => {
  const dispatch = useDispatch();

  //get token in localStorage
  let access_token = localStorage.getItem("access_token");
  userActions.getInformation(access_token);
  
  return <p>Login Main Page</p>;
}

export default LoginMain;