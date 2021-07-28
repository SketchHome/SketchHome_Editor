import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import { Spinner } from 'react-bootstrap';

const Login = (props) => {
  //Dispatch: store에 있는 데이터를 컨트롤 하기 위함
  const dispatch = useDispatch();
  //인가 코드
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  React.useEffect(async () => {
    await dispatch(userActions.kakaoLogin(code));
  }, []);
  
  return <Spinner/>;
}

export default Login;
 