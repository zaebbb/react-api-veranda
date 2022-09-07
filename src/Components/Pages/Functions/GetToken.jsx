import React from 'react';
import AuthCheck from "./AuthCheck";

const GetToken = () => {
    if(AuthCheck() !== false){
        let token = localStorage.getItem('auth');
        let role = token.substring(67)
        token = token.substring(0, 67)

        return {token, role}
    }

    return false
};

export default GetToken;
