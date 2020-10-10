import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Nav() {

    const [menu, setMenu] = useState(false);
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setMenu(true)
        }
    }, [])

    const exit = () => {
        localStorage.clear();
        window.location.href = '/';
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark  bg-dark p-0">
            <div className="container">
                <Link className="navbar-brand" to="/">Inicio</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {menu ?

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="#"><i className="fas fa-user"></i>Bienvenido: {name} {surname}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={() => exit()} to="/"><i className="fas fa-user-times"></i> Salir</Link>
                            </li>
                        </ul>
                    </div>
                    :
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/registrar"><i className="fas fa-user-plus"></i> Registrar</Link>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </nav>
    )
}
