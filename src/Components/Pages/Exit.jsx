import React from 'react';

const Exit = () => {
    localStorage.setItem("auth", "")
    window.location.href = "/"
};

export default Exit;
