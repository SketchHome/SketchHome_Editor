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

            //local store (temp)
            // localStorage.setItem("token", ACCESS_TOKEN);

           

            window.alert("Login success...");
            //get token -> change page to HOME
            //history.replace("/home"); 


            getInformation(ACCESS_TOKEN);
        
        }).catch((err) => {
            console.log("Login error", err);
            window.alert("Login failed...");
            //history.replace("/home");git 
        });
    }
};

//문제가 발생했다 문제는... 하... 이걸 다시 분리해야할 것 같다 도희님께 도움을 구하자!
const getInformation = (accessToken) => {
    axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then((data) => {
        window.alert("get information success!")
        console.log(data);

    }).catch((error) => {
        console.log("get information failed", error);
        window.alert("get information failed");

    });

};

const actionCreators = { kakaoLogin }; 

export { actionCreators }