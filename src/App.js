import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"  

import Produto from './admin/produto'
import Login from './login/login'
import axios from 'axios'

const Autenticado = async () => {
    var token = localStorage.getItem('NossoToken')
    var bearer = `Bearer ${token}`

    const url = "https://jartin.herokuapp.com/lista/produtos"
    await axios
            .get(
                url,
                {
                    headers: { "Authorization": bearer }
                }
            )
            .then( retorno => {
                if (retorno.data === "Token inválido ou já expirou") {
                    console.log(retorno.data)
                    return false
                }

                return true
            })
}

const RotaPrivada = ( { component: Component, ...rest } ) => {
    return (
        <Route
            { ...rest }
            render = {
                    props => Autenticado() ? (
                        <Component { ...props } { ...rest } />
                    ) : (
                        <Redirect to="/admin/produtos" />
                    )
            }
        />
    )
}

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={ Login }>
                </Route>
                <RotaPrivada path="/admin/produtos" component={ Produto } />
            </Switch>
        </Router>
    )
}

export default App