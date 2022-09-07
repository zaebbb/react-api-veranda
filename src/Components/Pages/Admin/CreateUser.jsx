import React, {useState} from 'react';
import GetToken from "../Functions/GetToken";
import AuthCheck from "../Functions/AuthCheck";

const CreateUser = () => {

    const [resp, setResp] = useState([])

    async function createUser(){

        let data = new FormData(document.querySelector(".form"))
        data.append("photo_file", document.querySelector(".form_file").files[0])

        let result = await fetch(`${process.env.REACT_APP_API}/api/user`, {
            method: "POST",
            body: data,
            headers: {
                "bearer_token": GetToken().token
            }
        }).then(res => {
            try {
                return res.json()
            } catch (err){
                return err
            }
        })

        if(result.error && result.error.errors){
            setResp(Object.values(result.error.errors))
        } else if(result.data && result.data.id){
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

        createUser().then(r => {})
    }

    return (
        <div>
            <h1>Добавление сотрудника</h1>
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

            <form onSubmit={sendForm} className={"form"}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Имя</span>
                    <input type="text" className="form-control" aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default" name={"name"} />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Фамилия</span>
                    <input type="text" className="form-control" aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default" name={"surname"} />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Отчество</span>
                    <input type="text" className="form-control" aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default" name={"patronymic"} />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Логин</span>
                    <input type="text" className="form-control" aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default" name={"login"} />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Пароль</span>
                    <input type="password" className="form-control" aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default" name={"password"} />
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupFile01">Фото</label>
                    <input type="file" className="form-control form_file" name="photo_file" />
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Уровень доступа</label>
                    <select className="form-select" name="role_id">
                        <option selected value={3}>Выборка.</option>
                        <option value={1}>Администратор</option>
                        <option value={2}>Оффициант</option>
                        <option value={3}>Повар</option>
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Создать" />
            </form>
        </div>
    );
};

export default CreateUser;
