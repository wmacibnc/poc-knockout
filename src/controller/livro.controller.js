exports.obterLivros = (req,res) =>{
    const lista = [
        { id: 1, nome: "nome a", autor: "autor a" },
        { id: 2, nome: "nome b", autor: "autor b" },
        { id: 3, nome: "nome c", autor: "autor c" },
        { id: 4, nome: "nome d", autor: "autor d" }
    ];

    const id = req.params.id;
    console.log("id: " + id)
    let data = null;
    if(id){
        console.log("entrou ")
        data = lista.find(e=> e. id== id);
        console.log("data: " + data)
    }else{
        data = lista;
    }

    res.status(200).send(
        data = data
    );
}


exports.get = (req, res, next) => {
    res.status(200).send('Requisição recebida com sucesso!');
};
exports.post = (req, res, next) => {
    res.status(201).send('Requisição recebida com sucesso!');
};
exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send('Requisição recebida com sucesso!' + id);
};
exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send('Requisição recebida com sucesso!' + id);
};