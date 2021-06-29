import axios from 'axios'

export const DeleteProduto = async (id) => {

    var idProduto = id

    var token = localStorage.getItem("NossoToken")
    var bearer = `Bearer ${token}`
    let url = "https://jartin.herokuapp.com/admin/produtos"
    
    await axios.delete(url, {
        headers: {
          Authorization: bearer
        },
        data: {
            id: idProduto
        }
      })
        .then( (retorno) => {
            console.log(retorno)
            if (retorno.data.nome) {
                alert("Produto excluido")
            }
        })
}
