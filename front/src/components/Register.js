import React, { useState } from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2';

export default function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const register = async (e) => {
        e.preventDefault();
        const user = { name, surname, email, password };
        const res = await Axios.post('http://localhost:3500/api/register', user);
        const msg = res.data.msg;
        console.log(msg);
        if (res >= 1) {
            Swal.fire({
                icon: 'error',
                title: msg,
                showCancelButton: false,
                timer: 1500
            });
        } else {
            /*const token = res.data.token;
            const name = res.data.name;
            const idUser = res.data.id;
            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            localStorage.setItem('idUser', idUser);
            window.location.href = '/';*/
            Swal.fire({
                icon:'success',
                title: 'Usuario registrado correctamente',
                showCancelButton: false,
                timer: 1500 
            });
        }

    }

    return (
        <div className="constainer mt-4">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="container text-center fa-5x">
                            <i className="fas fa-user-plus"></i>
                        </div>
                        <div className="card-header text-center">
                            <h4>Inicio de sesión</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={register}>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control" autoFocus required onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Apellido</label>
                                    <input type="text" className="form-control" autoFocus required onChange={(e) => setSurname(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Correo</label>
                                    <input type="email" className="form-control" autoFocus required onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" autoFocus required onChange={(e) => setPass(e.target.value)} />
                                </div>
                                <input type="submit" className="btn btn-primary btn-block" />
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
