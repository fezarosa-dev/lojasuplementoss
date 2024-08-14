//importa o pacote express, como uma constante chamada express
// este patoce deve ser intalado no terminal npm i express 
// tem que ter acesso a internet para instalar o pacote.
const express = require('express')
//inporta o pacote body-parser, com o nome da constante bodyparser
// serve para capturar os campos do formulário.
const bodyParser = require('body-parser')

const Compras = require('./src/model/Compras.js')

const vetor = new Array() // declara o vetor

//app é a nossa aplicação, criada neste momento
const app = new express()

// definindo área pública na pasta chamada public, o que tem dentro do public todos podem ver
app.use(express.static(__dirname + '/public'))
//configurar o bodyParser para captura os campos do formulário
app.use(bodyParser.urlencoded({ extended: true }))

//View engine que vai renderizar as páginas
app.set('view engine', 'ejs');
//pastas que vai ficar os templates para serem renderizados.
app.set("views", __dirname + '/src/view');

// trata a primeira chamanda ao site 127.0.0.1:3000
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get("/menu/:nome", function (req, res) {
    res.sendFile(__dirname + "/menu.html")

})

app.get('/principal', function (req, res) {
    res.sendFile(__dirname + '/principal.html')
})
app.get('/vestuario', function (req, res) {
    res.sendFile(__dirname + '/vestuario.html');
});

app.get('/suplementos', function (req, res) {
    res.sendFile(__dirname + '/suplementos.html')
})


app.post('/adicionar', function (req, res) {
    //o bloco try catch trata exceções
    try {
        let obj = new Compras();
        obj.preco = parseFloat(req.body.txtPreco);
        obj.qtd = parseInt(req.body.txtQtd);
        obj.nome = String(req.body.txtNome);
        obj.dsc = String(req.body.txtDsc);

        vetor.push(obj);
        res.send("Produto adicionado ao carrinho com sucesso");
    }
    catch (erro) {
        console.log("Erro: " + erro) // vai para o terminal
        res.send("Erro: " + erro) // vai para o browser
    }
})

app.get('/compras', function (req, res) {
    try {
        res.render("mostrarCompras", { adicionado: vetor });
    }
    catch (erro) {
        console.log("Erro: " + erro) // vai para o terminal
        res.send("Erro: " + erro) // vai para o browser
    }
})

app.get("/remover/:pos", function (req, res) {

    let pos = parseInt(req.params.pos)
    vetor.splice(pos, 1) // remove na posição e a quantidade
    res.redirect('/compras')
})

//deixa o site no ar na porta 3000, ip 127.0.0.1 que é o ip da máquina para a própria máquina
app.listen(3000, function (erro) {
    if (erro) {
        console.log("Erro no servidor: " + erro)
    }
    else {
        console.log("Servidor rodando na porta 3000")
    }
})

