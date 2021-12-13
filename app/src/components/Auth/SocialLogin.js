import React from "react";
import { useDispatch } from "react-redux";
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import { toast } from "react-toastify";

import { verifyGoogleToken } from "../../services/auth";

function SocialLogin() {
    const dispatch = useDispatch();
    const ggButtonStyle = { width: '100%' };

    const successGoogleLoginHandler = (response) => {
        dispatch(verifyGoogleToken(response.tokenId));
    }

    const failureGoogleLoginHandler = (response) => {
        console.log(response);
        toast.warn('Có lỗi khi đăng nhập!');
    }

    return (
        <GoogleLogin
            clientId="363623650683-5asnak0qhe873go03791oh3ln35uae26.apps.googleusercontent.com"
            render={renderProps => (
                <GoogleButton 
                    style = {ggButtonStyle}
                    type="light"
                    onClick={renderProps.onClick}>
                    Đăng nhập với Google
                </GoogleButton>
            )}
            onSuccess={successGoogleLoginHandler}
            onFailure={failureGoogleLoginHandler}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default SocialLogin;