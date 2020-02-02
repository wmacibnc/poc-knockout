function IndexViewModel() {
    var self = this;
    
    self.produto =  ko.observable({nome:'', preco: 0});
    self.exibirLista = ko.observable(true);
    self.exibirDetalhar = ko.observable(false);
    self.exibirCadastro = ko.observable(false);
    self.id = 5;
    self.produtos =  ko.observableArray([]);

    function init() {
        newProduto({ id: 1, nome: "nome a", preco: 5 })
        newProduto({ id: 1, nome: "nome b", preco: 15 })
        newProduto({ id: 1, nome: "nome c", preco: 10 })
        newProduto({ id: 1, nome: "nome d", preco: 20 })

        console.log(self.produtos())
    };

    function newProduto(produto){
        self.produtos().push(produto);
    }

    self.detalhar = (produto) => {
        console.log(produto);
        self.produto(produto);
        self.exibirDetalhar(true);
        self.exibirCadastro(true);
        self.exibirLista(false);
    }

    self.cadastro = function() {        
        console.log(self.produto());
        if(self.produto().id == null){
            self.produto().id = self.id++;
        }else{
            remove(self.produtos(), self.produto())
        }
        self.produtos.push(self.produto());
        self.exibirDetalhar(false);
        self.exibirCadastro(false);
        self.exibirLista(true);
    }

    self.novo = function(){
        self.produto({});
        self.exibirDetalhar(false);
        self.exibirCadastro(true);
        self.exibirLista(false);

    }

    self.excluir = (produto) => {      
        remove(self.produtos(), produto)
        self.produto({});
    }

    self.voltar = () =>{
        self.exibirDetalhar(false);
        self.exibirCadastro(false);
        self.exibirLista(true);
    }
    function remove(arr, item) {
        for (var i = arr.length; i--;) {
            if (arr[i] === item) {
                arr.splice(i, 1);
            }
        }
        self.produtos(arr);
    }

    self.valorTotal = ko.pureComputed(function() {
        let valorTotal = 0;
        self.produtos().forEach(p => {
            valorTotal += parseInt(p.preco);
        });
        return valorTotal;
    }, this);

    init();
}
ko.applyBindings(new IndexViewModel());