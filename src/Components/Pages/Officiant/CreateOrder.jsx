import React, {useState} from 'react';
import GetToken from "../Functions/GetToken";

const CreateOrder = () => {

    const [resp, setResp] = useState([])

    async function sendData(){
        let data = new FormData(document.querySelector(".form"))

        let result = await fetch(`${process.env.REACT_APP_API}/api/order`, {
            method: "POST",
            body: data,
            headers: {
                bearer_token: GetToken().token
            }
        }).then(res => {
            try {
                return res.json()
            } catch(err){
                return err
            }
        })

        if(result && result.error && result.error.code === 403){
            setResp([result.error.message])
        } else if(result.error && result.error.errors){
            setResp(Object.values(result.error.errors))
        } else if(result.data && result.data.id){
            setResp([])

            document.querySelector(".form").innerHTML = `
                <div class="alert alert-success" role="alert">
                  Заказ создан, вы будете перенаправлены автоматически!
                </div>
            `

            setTimeout(() => {
                window.location.href = "/"
            }, 1500)
        }
    }

    function sendForm(e){
        e.preventDefault()
        sendData().then(r => {})
    }

    return (
        <form className={"form"} onSubmit={sendForm}>
            {
                resp.length !== 0 ? (
                    <div className="alert alert-danger" role="alert">
                        {
                            resp.length !== 0 && resp.map((el, key) => {
                                return <span key={key}>{el} <br /></span>
                            })
                        }
                    </div>
                ) : ""
            }
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">Идентификатор столика</span>
                <input type="text" className="form-control" aria-describedby="basic-addon3" name={"table_id"} />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">Идентификатор рабочей смены</span>
                <input type="text" className="form-control" aria-describedby="basic-addon3" name={"work_shift_id"} />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">Количество посетителей</span>
                <input type="text" className="form-control" aria-describedby="basic-addon3" name={"number_of_person"} />
            </div>
            <input type="submit" className="btn btn-primary" aria-describedby="basic-addon3" value={"Создать"} />
        </form>
    );
};

export default CreateOrder;
