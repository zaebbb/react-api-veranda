import React, {useEffect, useState} from 'react';
import AuthCheck from "./Functions/AuthCheck";
import GetToken from "./Functions/GetToken";
import {Link} from "react-router-dom";

const WorkShift = () => {

    if(AuthCheck() === false) window.location.href = "/"

    const [data, setData] = useState([])

    async function getOrders(){
        let result = await fetch(`${process.env.REACT_APP_API}/api/work-shift`, {
            method: "GET",
            headers: {
                "bearer_token": GetToken().token
            }
        }).then(res => {
            try {
                return res.json()
            } catch(err){
                return err
            }
        })

        console.log(result)

        if(result && result.data){
            setData(result.data)
        }
    }

    useEffect(() => {
        getOrders().then(r => {})
    }, []);


    return (
        <div>
            {
                data.length !== 0 ? data.map((el, key) => {
                    return (
                        <div className="card" key={key}>
                            <div className="card-body">
                                <h5 className="card-title">Смена {key + 1}</h5>
                                <p className="card-text">Старт смены: {el.start}</p>
                                <p className="card-text">Конец смены: {el.end}</p>
                                <Link to={"/work-shift/" + el.id} className="btn btn-primary">Перейти</Link>
                            </div>
                        </div>
                    )
                }) : ""
            }

        </div>
    );
};

export default WorkShift;
