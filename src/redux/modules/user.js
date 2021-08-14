import axios from "axios";
import { CLIENT_ID, REDIRECT_URI } from "../../components/Login/OAuth";

const kakaoLogin = (code) => {
    return function (dispatch, getState) {
        axios({
            method: "GET",
            url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`,

            //need to POST Method (for safety)
            // method: "POST",
            // url: `https://kauth.kakao.com/oauth/token`,
            // data: {
            //     grant_type : 'authorization_code',
            //     client_id : CLIENT_ID,
            //     redirect_uri : REDIRECT_URI, 
            //     code : code,
            // }
        })
        .then((res) => {
            //get token
            console.log("Token", res);

            const ACCESS_TOKEN = res.data.access_token;
            const REFRESH_TOKEN = res.data.refresh_token;

            console.log("Access_Token :", ACCESS_TOKEN);
            console.log("Refresh_Token :", REFRESH_TOKEN);

            //store localstorage (temp)
            localStorage.setItem("access_token", ACCESS_TOKEN);
            localStorage.setItem("refresh_token", REFRESH_TOKEN);
           
            window.alert("Login success...");
            //get token -> change page to HOME
            getInformation(ACCESS_TOKEN);

            /*
            if(location.pathname === '/login') {
                history.push('/loginmain');
            }
            */
        
        }).catch((err) => {
            console.log("Login error", err);
            window.alert("Login failed...");
       
        });
    }
};

//issue: get token information
const getInformation = (accessToken) => {
    axios.get("/v2/user/me", { //https://kapi.kakao.com/v2/user/me
        headers: {
            //kakao server에서 설정해 주어야 한다 -> CORS 문제
            // "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`
        }
    }).then((data) => {
        console.log(data);
        //issue: Data -> json 형식으로 분리 요청
        //window.alert("get information success!")

    }).catch((error) => {
        console.log("get information failed", error);
        //window.alert("get information failed");

    });
};

const actionCreators = { kakaoLogin }; 
const getTokens = { getInformation };

export { actionCreators, getTokens }