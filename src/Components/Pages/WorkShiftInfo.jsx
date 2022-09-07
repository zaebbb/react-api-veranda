import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import GetToken from "./Functions/GetToken";

const WorkShiftInfo = () => {

    let {id} = useParams()

    const [resp, setResp] = useState([])

    async function get_orders(){
        let data = new FormData(document.querySelector(".form"))

        let result = await fetch(`${process.env.REACT_APP_API}/api/work-shift/${id}/user`, {
            method: "POST",
            body: data,
            headers: {
                "bearer_token": GetToken().token
            }
        }).then(res => {
            try {
                return res.json()
            } catch (err) {
                return err
            }
        })

        if(result && result.error && result.error.code === 403){
            setResp([result.error.message])
        } else if(result && result.error && result.error.errors){
            setResp(Object.values(result.error.errors))
        } else if(result.data && result.data.id){
            setResp([])

            document.querySelector(".form").innerHTML = `
                <div class="alert alert-success" role="alert">
                  Пользователь записан на, вы будете перенаправлены автоматически!
                </div>
            `

            setTimeout(() => {
                window.location.href = "/"
            }, 1500)
        }
    }

    function sendForm(e){
        e.preventDefault()

        get_orders().then(r => {})
    }

    return (
        <div>
            <h1>Добавить сотрудника на смену {id}</h1>
            <form onSubmit={sendForm} className={"form"}>
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
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Идентификатор пользователя</span>
                    <input type="text" className="form-control" aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default" name={"user_id"} />
                </div>
                <input type="submit" className="btn btn-primary" value={"Добавить"} />
            </form>
        </div>
    );
};

export default WorkShiftInfo;
