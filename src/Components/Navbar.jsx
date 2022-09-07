import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import AuthCheck from "./Pages/Functions/AuthCheck";
import GetToken from "./Pages/Functions/GetToken";

const Navbar = () => {
    let token = GetToken()

    const [links, setLinks] = useState([])

    useEffect(() => {
        if(token !== false && token.role === "a"){
            setLinks([
                {name: "Добавить сотрудника", link: "/users/create"},
                {name: "Сотрудники", link: "/users"},
                {name: "Создать смену", link: "/add-work-shift"},
                {name: "Заказы", link: "/orders"},
                {name: "Смены", link: "/work-shift"},
                {name: "Выход", link: "/exit"},
            ])
        } else if(token !== false && token.role === "o"){
            setLinks([
                {name: "Смены", link: "/work-shift"},
                {name: "Создать заказ", link: "/order-create"},
                {name: "Заказы", link: "/orders"},
                {name: "Смены", link: "/work-shift"},
                {name: "Выход", link: "/exit"},
            ])
        } else if(token !== false && token.role === "c"){
            setLinks([
                {name: "Заказы", link: "/orders"},
                {name: "Смены", link: "/work-shift"},
                {name: "Выход", link: "/exit"},
            ])
        }
    }, []);


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Veranda</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {
                            token !== false ? (
                                links.length !== 0 && links.map((el, key) => {
                                    return (
                                        <li className="nav-item" key={key}>
                                            <Link className="nav-link" to={el.link}>{el.name}</Link>
                                        </li>
                                    )
                                })
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth">Авторизация</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
