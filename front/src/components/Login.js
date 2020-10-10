import React, { useState } from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const login=async(e)=>{
        e.preventDefault();
        const user={email, password};
        const res = await Axios.post('http://localhost:3500/api/login', user);
        const msg = res.data.msg;
        console.log(res);
        if(msg==='faild'){
            Swal.fire({
                icon:'error',
                title:'Datos incorrectos',
                showCancelButton: false,
                timer: 1500 
            });
            console.log(msg);
        }else{
            const token = res.data.token;
            const name = res.data.name;
            const surname = res.data.surname;
            const idUser = res.data._id;
            localStorage.setItem('token',token);
            localStorage.setItem('name',name);
            localStorage.setItem('surname',surname);
            localStorage.setItem('idUser', idUser);
            window.location.href='/index';
            /*Swal.fire({
                icon:'success',
                title: 'Bienvenido',
                showCancelButton: false,
                timer: 1500 
            });*/
        }

    }

    return (
        <div className="constainer mt-4">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="container text-center fa-5x">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="card-header text-center">
                            <h4>Inicio de sesión</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={login}>
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
