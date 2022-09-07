import React from 'react';

let AuthCheck = () => {
    if(localStorage.getItem("auth") === null){
        localStorage.setItem("auth", "")
    }

    if(localStorage.getItem("auth") !== ""){
        return localStorage.getItem("auth")
    }

    return false
};

export default AuthCheck
