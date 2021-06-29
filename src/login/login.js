import React from 'react';
import { 
    Button, 
    TextField,
    Paper, 
    Box, 
    Grid, 
    Typography,
    CircularProgress
} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import{ useState } from 'react'
import axios from 'axios'

const Copyright = () => {

    return(

        <Typography variant="body2" color="textSecondary" align="center">

            {' Copyright © '}
            Jorgio Cavaretto 010618026

        </Typography>

    );

}

const useStyles = makeStyles((theme) => ({

    root: {
        height: '100vh',
    },
    
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    paper: {
        margin: theme.spacing(25,4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    inferior: {
        position: "absolute",
        right: "center",
        top: "center",
    }

}));
const Login = () => {
    const [ carregar, setCarregar ] = useState(false)
    const [ usuario, setUsuario ] = useState()
    const [ senha, setSenha ] = useState()

    const efetuarLogin = async () => {
        setCarregar(true)

        let url = "https://jartin.herokuapp.com/login" 
        var data = { 
            usuario: usuario, 
            senha
        }

        await axios.post(
            url,
            data
        )
            .then( (retorno) => {
                
                if (retorno.data.token) {
                    console.log(retorno.data)
                    localStorage.setItem("NossoToken", retorno.data.token)
                    localStorage.setItem("MeuNome", retorno.data.nome)
                    window.location = "/admin/produtos"

                }

                if (retorno.data.token === undefined)
                    alert(retorno.data)

                setCarregar(false)
            })
    }
    
            const classes = useStyles()

    return(

        <Grid container component="main" className={classes.root} >
            <CssBaseline />
            <Grid item xs={false} sm={6} md={7} className={classes.image} />
            <Grid item xs={12} sm={6} md={5} component={Paper} >
                <div className={classes.paper} >
                    <Typography component="h1" variant="h3" >
                        EletroCompre
                    </Typography>
                    
                        <TextField
                            color="secodary"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Usuario"
                            value={ usuario }
                            onChange={ (e) => setUsuario(e.target.value)}
                        />

                        <TextField
                            color="secodary"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Senha" 
                            type="password"
                            value={ senha }
                            onChange={ (e) => setSenha(e.target.value)}
                        />

                    <br/>
                    {
                    (carregar)?(<CircularProgress color="secondary"/>):("")
                    }
                    
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={ () => efetuarLogin() }
                        >
                            Entrar
                        </Button>

                        <Box mt={5}>
                            <Copyright />
                        </Box>
                </div>
             </Grid>
         </Grid>
    )

}
export default Login