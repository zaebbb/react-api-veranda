import React from 'react';
import GetToken from "./Functions/GetToken";

const Main = () => {

    let token = GetToken()

    return (
        <div>
            <h1>Veranda</h1>
            {
                token === false ? (
                    <p>Авторизируйтесь для продолжения</p>
                ) : (
                    <p>Вы вошли в аккаунт</p>
                )
            }
        </div>
    );
};

export default Main;
