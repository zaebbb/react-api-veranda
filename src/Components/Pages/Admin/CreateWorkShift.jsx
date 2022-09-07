import React, {useState} from 'react';
import GetToken from "../Functions/GetToken";
import AuthCheck from "../Functions/AuthCheck";

const CreateWorkShift = () => {

    if(AuthCheck() === false) window.location.href = "/"

    const [resp, setResp] = useState([]);

    async function sendData(){
        let data = new FormData(document.querySelector(".form"));

        let result = await fetch(`${process.env.REACT_APP_API}/api/work-shift`, {
            method: "POST",
            body: data,
            headers: {
                "bearer_token": GetToken().token
            },
            mode: 'no-cors'
        }).then(res => {
            try {
                return res.json()
            } catch(err){
                return err
            }
        })

        if(result && result.error && result.error.errors){
            setResp(Object.values(result.error.errors))
        } else if(result.data){
            setResp([])

            document.querySelector(".form").innerHTML = `
                <div class="alert alert-success" role="alert">
                  Пользователь создан, вы будете перенаправлены автоматически!
                </div>
            `

            setTimeout(() => {
                window.location.href = "/"
            }, 1500)
        }
    }

    function sendForm(e){
        e.preventDefault();

        sendData().then(r => {})
    }

    return (
        <div>
            <h1>Создание смены</h1>
            {
                resp.length !== 0 ? (
                    <div className="alert alert-danger" role="alert">
                        {
                            resp.length !== 0 && resp.map((el, key) => {
                                return ( <span key={key}>{el} <br /></span> )
                            })
                        }
                    </div>
                ) : ""
            }
            <form className="form" onSubmit={sendForm}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Старт смены</span>
                    <input type="datetime-local" className="form-control" placeholder="Username" aria-label="Username"
                           aria-describedby="basic-addon1" name={"start"} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Конец смены</span>
                    <input type="datetime-local" className="form-control" placeholder="Username" aria-label="Username"
                           aria-describedby="basic-addon1" name={"end"} />
                </div>
                <input type="submit" value={"Создать смену"} className="btn btn-primary"/>
            </form>
        </div>
    );
};

export default CreateWorkShift;
