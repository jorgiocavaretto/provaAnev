import axios from 'axios'

const EditarProduto = async (idProduto, nomeProduto, descricaoProduto, precoProduto, quantidadeProduto, urlImagemProduto) => {
    var token = localStorage.getItem("NossoToken")
    var bearer = `Bearer ${token}`
    let url = "https://jartin.herokuapp.com/admin/produtos"

    var dataEditar = { 
        id: idProduto,
        nome: nomeProduto, 
        descricao: descricaoProduto,
        preco: precoProduto,
        quantidade: quantidadeProduto,
        imagem: urlImagemProduto
    }
    await axios.put(
        url,
        dataEditar,
        {
            headers: { "Authorization": bearer },
        })
        .then( (retorno) => {
            if (retorno.data.nome) {
                alert("Produto atualizado")
            }
        })
}
export default EditarProduto