import React, {useEffect, useState} from 'react';
import AuthCheck from "../Functions/AuthCheck";
import GetToken from "../Functions/GetToken";

const Users = () => {

    if(AuthCheck() === false) window.location.href = "/"

    const [data, setData] = useState([])

    async function get_users(){
        let result = await fetch(`${process.env.REACT_APP_API}/api/user`, {
            method: 'GET',
            headers: {
                "bearer_token": GetToken().token
            }
        }).then(res => {
            try {
                return res.json()
            } catch (err){
                return err
            }
        });

        if(result && result.data){
            setData(result.data)
        }
    }

    useEffect(() => {
        get_users().then(r => {})
    }, [])

    function delUser(id){
        alert("Удаление пользователя по ID " + id)
    }

    return (
        <div>
            {
                data.length === 0 ? <h1>Загрузка</h1> : (
                    <div className={"row d-flex"}>
                        {
                            data.length !== 0 && data.map((el, key) => {
                                return (
                                    <div className="card width-50" key={key}>
                                            <div className="card-body">
                                                <h5 className="card-title">{el.login}</h5>
                                                <p>{el.name}</p>
                                                <p>{el.status}</p>
                                                <p>Уровень доступа: {el.group}</p>
                                                <a onClick={() => delUser(el.id)} href="#" className="btn btn-danger">Удалить</a>
                                            </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Users;
