function ListaLivroViewModel(params) {
    this.parametros = params;
}

function LivroViewModel(params) {
    this.parametros = params;
}

function DetalharLivroViewModel(params) {
    this.parametros = params;
}

function IndexViewModel() {
    var self = this;

    self.exibirDetalhar = ko.observable(true);
    self.exibirLista = ko.observable(true);
    self.exibirCadastro = ko.observable(true);
    self.subtitulo = 'Listagem de livros';
    self.livro = ko.observable(false);


    function init() {
        self.livros = [
            { nome: "nome a", autor: "autor a" },
            { nome: "nome b", autor: "autor b" },
            { nome: "nome c", autor: "autor c" },
            { nome: "nome d", autor: "autor d" }
        ];
    };

    self.detalhar = (livro) => {
        self.livro = (livro);
        console.log(livro);
        self.exibirDetalhar(true);
        self.exibirLista(false);
    }

    ko.components.register('lista-livro', {
        template: { element: 'lista-livros-template' },
        viewModel: ListaLivroViewModel
    });

    ko.components.register('cadastro-livro', {
        template: { element: 'livro-template' },
        viewModel: LivroViewModel
    });

    ko.components.register('detalhar-livro', {
        template: { element: 'detalhar-livro-template' },
        viewModel: DetalharLivroViewModel
    });

    init();
}
ko.applyBindings(new IndexViewModel());