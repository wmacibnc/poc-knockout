function IndexViewModel() {
    var self = this;
    
    self.produto =  ko.observable({nome:'a', preco: 0});
    self.exibirLista = ko.observable(true);
    self.exibirDetalhar = ko.observable(false);
    self.exibirCadastro = ko.observable(false);
    self.id = 5;

    function init() {
        self.produtos =  ko.observableArray([
            { id: 1, nome: "nome a", preco: 23 },
            { id: 2, nome: "nome b", preco: 24 },
            { id: 3, nome: "nome c", preco: 25 },
            { id: 4, nome: "nome d", preco: 26 }
        ]);
        console.log(self.produtos)
    };

    self.detalhar = (produto) => {
        console.log(produto);
        self.produto(produto);
        self.exibirDetalhar(true);
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
        self.exibirDetalhar(true);
        self.exibirLista(false);
    }

    self.novo = function(){
        self.produto({});
    }

    self.excluir = (produto) => {        
        remove(self.produtos(), produto)
        self.exibirDetalhar(true);
        self.exibirLista(false);
    }

    function remove(arr, item) {
        for (var i = arr.length; i--;) {
            if (arr[i] === item) {
                arr.splice(i, 1);
            }
        }
        self.produtos(arr);
    }

    init();
}
ko.applyBindings(new IndexViewModel());