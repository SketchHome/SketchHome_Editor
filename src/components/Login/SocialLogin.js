import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css?after';

/*Kakao login Btn*/
import { KAKAO_AUTH_URL } from "./OAuth";

function SocialLogin() {
    return (
        <Button href={KAKAO_AUTH_URL} className="KakaoLoginBtn">
            <span>카카오계정 로그인</span>
        </Button>
    );
}
export default SocialLogin;