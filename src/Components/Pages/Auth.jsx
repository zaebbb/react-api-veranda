import React, {useState} from 'react';
import AuthCheck from "./Functions/AuthCheck";
import Navbar from "../Navbar";

const Auth = () => {

    if(AuthCheck() !== false) window.location.href = "/"

    const [resp, setResp] = useState([])

    async function sendData(){
        let formData = new FormData(document.querySelector(".form"))
        let result = await fetch(`${process.env.REACT_APP_API}/api/login/`, {
            method: "POST",
            body: formData,
            mode: 'no-cors'
        }).then(res => {
            try {
                return res.json();
            } catch (err) {
                return err
            }
        })

        if(result.error && result.error.code === 401) {
            setResp([result.error.message])
        } else if(result.error && result.error.errors){
            setResp(Object.values(result.error.errors))
        } else if(result.data && result.data.user_token){
            setResp([])
            localStorage.setItem("auth", result.data.user_token)

            document.querySelector(".form").innerHTML = `
                <div class="alert alert-success" role="alert">
                  Вы успешно авторизовались, вы будете перенаправлены автоматически!
                </div>
            `

            setTimeout(() => {
                if(AuthCheck() !== false) window.location.href = "/"
            }, 1500)
        }
    }

    function sendForm(e){
        e.preventDefault();
        sendData().then(r => {})
    }

    return (
        <div className={"container"}>
            {
                resp.length !== 0 ? (
                    <div className="alert alert-danger" role="alert">
                        {
                            resp.length !== 0 && resp.map((el, key) => {
                                return (
                                    <span key={key}>{el} <br /></span>
                                )
                            })
                        }
                    </div>
                ) : ""
            }
            <form onSubmit={sendForm} className={"form"}>
                <h1>Авторизация</h1>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Введите ваш пароль" name={"login"} />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Введите ваше пароль" name={"password"} />
                </div>
                <div className="mb-3">
                    <input type="submit" className="btn btn-primary" value="Авторизоваться" />
                </div>
            </form>
        </div>
    );
};

export default Auth;
