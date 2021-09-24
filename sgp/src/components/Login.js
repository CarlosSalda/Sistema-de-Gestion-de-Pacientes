import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/Login.css'
import { useHistory } from 'react-router';
import background from '../assets/background.jpg'


const Login = () => {

    const history = useHistory();
    const inputRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
        inputRef.current.disabled = !checkEmail() || !checkPassword()
    };


    const checkEmail = () => {
        const emailInput = (emailRef.current.value).trim()
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailInput.length >= 5 && re.test(String(emailInput).toLowerCase())
    };

    const checkPassword = () => {
        const passwordInput = passwordRef.current.value

        return passwordInput.trim().length >= 5
    };

    const goToHome = (event) => {
        event.preventDefault();
        console.log(`mi email es: ${data.email} y mi password es:${data.password}`)
    };

    const goToRecover = () => {
        history.push("/recoverPassword")
    }

    return (
        <>
            <img src={background} alt="background" className="myBackgroundLogin"></img>
            
            <div className="divFormLogin">
                <p className="title"> SGP </p>
                <Form className="mainForm" onSubmit={goToHome}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control ref={emailRef} className="boxInput" name="email" onChange={handleInputChange} placeholder="Email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control ref={passwordRef} className="boxInput" name="password" type="password" placeholder="Contraseña" onChange={handleInputChange} />
                    </Form.Group>

                    <Button className="boton" ref={inputRef} variant="success" type="submit" disabled>
                        Iniciar sesion
                    </Button>
                    <hr />
                    <Form.Group>
                        <p className="urlRecover" onClick={goToRecover}>¿Olvidaste tu contraseña?</p>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
};


export default Login;
