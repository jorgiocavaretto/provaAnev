import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { carregaDados } from './request';
import {DeleteProduto} from './DeleteProduto';
import CadastroProduto from './CadastroProduto';
import EditarProduto from './EditarProduto';
import { AppBar, Toolbar, CardActionArea, CardActions} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      marginTop: 15,
      flexGrow: 1
    },
    form: {
        marginTop: 15,
    },
    media: {
      height: 0,
      paddingTop: '80%',
    },
      title: {
        flexGrow: 1,
      },
  }));

const Produto = () => {
    const [lista, setLista] = useState()
    const [exibir, setExibir] = useState(false)
    const [exibirNome, setExibirNome] = useState()
    const [exibirButton, setExibirButton] = useState()
    const [nomeProduto, setNomeProduto] = useState()
    const [descricaoProduto, setDescricaoProduto] = useState()
    const [precoProduto, setPrecoProduto] = useState()
    const [quantidadeProduto, setQuantidadeProduto] = useState()
    const [urlImagemProduto, setUrlImagemProduto] = useState()
    const [idProduto, setIdProduto] = useState()
    const classes = useStyles();

    const handleExibirButton = (nome, button, idProduto, nomeProduto, descricaoProduto, precoProduto, quantidadeProduto, urlImagemProduto) => {
        setExibir(true)
        setExibirNome(nome)
        setExibirButton(button)
        
        setIdProduto(idProduto)
        setNomeProduto(nomeProduto)
        setDescricaoProduto(descricaoProduto)
        setPrecoProduto(precoProduto)
        setQuantidadeProduto(quantidadeProduto)
        setUrlImagemProduto(urlImagemProduto)
    }

    const handleExibir = (nome, nomeButton) => {
        setExibir(true)
        setExibirNome(nome)
        setExibirButton("")

        if(nomeButton === "Cadastrar") {
            setIdProduto("")
            setNomeProduto("")
            setDescricaoProduto("")
            setPrecoProduto("")
            setQuantidadeProduto("")
            setUrlImagemProduto("")
        }
    }
    
    useEffect(() => {
        carregaDados().then((result) => {
          setLista(result);
        });
      }, [lista]);



    return (
        <div>
        <AppBar color= "secondary" position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                Lista de Produtos                                                                                           
                </Typography>
                <Button variant="outlined" color="inherit" onClick={()=>handleExibir("Cadastro de Produto", "Cadastrar")}>Novo Produto</Button>
            </Toolbar>
        </AppBar>
        
            <Grid container spacing={1} >
                {lista &&
                lista.map( (linha) => (
                <Grid key={linha._id} item xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                            className= {classes.media}
                            image={linha.imagem}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {linha.nome}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {linha.descricao}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                Preço: {linha.preco}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                Quantidade: {linha.quantidade} <br/>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                Ativo: {linha.ativo ? "Ativo":"Inativo"}
                                </Typography>
                                </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={()=>handleExibirButton("Editar Produto", "Editar", linha._id, linha.nome, linha.descricao, linha.preco, linha.quantidade, linha.imagem)}>
                                Editar
                            </Button>
                            <Button size="small" color="primary" onClick={()=>DeleteProduto(linha._id)}>
                                Excluir
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            { exibir ?  <div>
            <h1>{exibirNome}</h1>
            <form className={classes.root} noValidate autoComplete="off">
            <TextField 
                label="Nome"
                name="nome"
                value={ nomeProduto }
                onChange={ (e) => setNomeProduto(e.target.value)}
            />
            <TextField
                className={classes.form}
                label="Descricao"
                name="descricao"
                value={ descricaoProduto }
                onChange={ (e) => setDescricaoProduto(e.target.value)}
            />
            <TextField
                className={classes.form}
                label="Preço"
                name="preco"
                value={ precoProduto }
                onChange={ (e) => setPrecoProduto(e.target.value)}
            />
            <TextField
                className={classes.form}
                label="Quantidade"
                name="quantidade"
                value={ quantidadeProduto }
                onChange={ (e) => setQuantidadeProduto(e.target.value)}
            />
            <TextField
                className={classes.form}
                label="URL Imagem"
                name="urlImagem"
                value={ urlImagemProduto }
                onChange={ (e) => setUrlImagemProduto(e.target.value)}
            />
            </form>
            {exibirButton === "Editar" ?
             <Button
             className={classes.form}
             color="primary"
             variant="outlined"
             onClick={() => EditarProduto(idProduto, nomeProduto, descricaoProduto, precoProduto, quantidadeProduto, urlImagemProduto, exibirButton)}
            >
                Confirmar edição
            </Button>                
            : <Button
                    className={classes.form}
                    color="primary"
                    variant="outlined"
                    onClick={() => CadastroProduto(nomeProduto, descricaoProduto, precoProduto, quantidadeProduto, urlImagemProduto)}
                >
                Inserir Produto
            </Button>}
        </div>: "" }
        </div>
    )
}

export default Produto