const express = require("express");

const bodyParser = require("body-parser");


const mongoose = require("mongoose");

// Criando CORS instalando no terminal a extensão com o seguintes comandos (npm i cors)
const cors = require("cors");



const config= {
    origin:"*",
    optionsSuccessStatus:200
}





// Criando o link com o mongoDB

const url = "mongodb+srv://davifonseca:d1d21528@cluster0.qvelb.mongodb.net/lixoEletronico?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});

// criando as estruturas das tabelas
const tbnoticias = mongoose.Schema({
    titulo: String,
    datapublicacao: String,
    texto: String,
    autor: String,
    img1: String,
    img2: String

});
// Iniciando a tabela de cadastro de colaboradores e administradores
const tbcadastro = mongoose.Schema({
    nomecolaborador: String,
    telefone: String,
    email: String,
    endereco: String,
    cpf: String,
    usuario: String,
    datacadastro: String,
    cargo: String,
    senha: String,
    Sexo: String,
    nascimento: String,
    rg: String,
    estadocivil: String,
    remuneracao: String

});

const tbcontato = mongoose.Schema({
    nomecliente:String,
    email:String,
    telefone:String,
    assunto: String
    
});
const tbadm = mongoose.Schema({
    nomeadm:String,
    email:String,
    loginusuario:String,
    senhausuario: String
    
});


// Colocando agora no banco de dados as aplicações feitas nas tabelas de cadastros
const Noticias = mongoose.model("noticias", tbnoticias);
const Contato = mongoose.model("contato", tbcontato);
const Cadastros = mongoose.model("cadastro", tbcadastro);
const Administrador = mongoose.model("administrador", tbadm);





const app = express();

app.use(cors())

app.use(bodyParser.json());

// Criando a rota raiz da página principal ao colocar http://localhost:3350
app.get("/", cors(config), (req, res) => {
    res.status(200).send({
        titulo: "Lixo Eletrônico",
        texto: "Em suma, o descarte incorreto de E-lixos impacta a saúde pública devido aos metais pesados, gera danos ao meio ambiente através da contaminação de solos, lençóis freáticos e os organismos da fauna e da flora e, além disso, reduz o tempo de vida dos aterros sanitários.",
        autor: "Davi Fonseca",
        datadepublicacao: "30/08/2021",
        imagens:[
            "data:image/jpeg;base64,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",
            "data:image/jpeg;base64,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"
        ]
    });
});


// faremos agora o refactor(refatorar), ou seja, modificar o código para uma nova execução é uma atualização
// do código rota para exibir todos os produtos cadastrados no banco de dados.



// Criando rota da tabela produto
app.get("/noticias", cors(config), (req, res) => {
    // fazendo agora o refactor para exibir todos os produtos cadastrados na tela
    Noticias.find().then((rs) => {
        res.status(200).send({ output: rs })
        
    });
    });

    app.get("/noticias/:id", cors(config), (req, res) => {
        Noticias.findById(req.params.id).then((rs) => {
            res.status(200).send({ output: rs })
        });
    });



app.post("/noticia/cadastro",cors(config),(req,res)=>{
   
    const dados = new Noticias(req.body);
    dados.save().then((rs)=>{
        res.status(201).send({output:"Dados cadastrados "+rs})
    }).catch((erro)=>res.status(400).send({output:"Erro na execução" + erro}))
});




app.put("/atualizar/:id",cors(config),(req,res) =>{
    // aplicando refactor do produto para encontrar pelo id e atualizar
    Noticias.findByIdAndUpdate(req.params.id, req.body, (erro, dados) => {
        if (erro) {
            res.status(400).send({ output:"Erro ao tentar atualizar" + erro });
            return;
        }
        res.status(200).semd({output:"Dados atualizado com Sucesso!" + dados });
    });


    // res.send({produto:"produto"});     // documentando a rota para fazermos o refactor do put para produto
});

app.delete("/apagar/:id",cors(config), (req, res) => {
    // aplicando refactor do produto para apagar usando o id
    Noticias.findByIdAndDelete(req.params.id).then((rs) => {
        res.status(200).send({ output: "Noticia apagada." });
    });

    // res.send({contato:"apagar"});
});



// Criando rota da tabela contato

app.get("/contatos", cors(config), (req, res) => {
    Contato.find().then((rs) => {
        res.status(200).send({ output: rs })
    });
});
//localizar um produto por seu id
app.get("/contato/:id", cors(config), (req, res) => {
    Contato.findById(req.params.id).then((rs) => {
        res.status(200).send({ output: rs })
    });
});



// Rota para cadastrar os colaboradores e administradores 
app.post("/contato/cadastro",cors(config), (req, res) => {
    // criando 7ª parte usando a ligação com a 6ª parte
    const dados = new Contato(req.body);
    dados.save().then((rs)=>{
        res.status(201).send({output:"Dados cadastrados "+rs})
    }).catch((erro) => res.status(400).send({ output: "Erro na execução" + erro }))

});



// Rota para atualizar o cadastro
app.put("/atualizar/:id", cors(config), (req, res) => {

   
    Contato.findByIdAndUpdate(req.params.id, req.body, (erro, dados) => {
        if (erro) {
            res.status(400).send({ output: "Erro ao tentar atualizar Contato " + erro });
            return;
        }
        res.status(200).send({ output: "Contato atualizado com sucesso! " + dados });
    });


});
// Rota para apagar dados cadastrado
app.delete("/apagar/:id", cors(config), (req, res) => {
    Contato.findByIdAndDelete(req.params.id).then((rs) => {
        res.status(200).send({ output: "Contato apagado." });
    });
});






// 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//  Rota para exibir os cadastros dos colaboradores e administradores no bando de dados
app.get("/colaboradores", cors(config), (req, res) => {
    Cadastros.find().then((rs) => {
        res.status(200).send({ output: rs })
    });
});
//localizar um produto por seu id
app.get("/colaborador/:id", cors(config), (req, res) => {
    Cadastros.findById(req.params.id).then((rs) => {
        res.status(200).send({ output: rs })
    });
});



// Rota para cadastrar os colaboradores e administradores 
app.post("/colaborador/cadastro",cors(config), (req, res) => {
    // criando 7ª parte usando a ligação com a 6ª parte
    const dados = new Cadastros(req.body);
    dados.save().then((rs)=>{
        res.status(201).send({output:"Dados cadastrados "+rs})
    }).catch((erro) => res.status(400).send({ output: "Erro na execução" + erro }))

});



// Rota para atualizar o cadastro
app.put("/atualizar/:id", cors(config), (req, res) => {

   
    Cadastros.findByIdAndUpdate(req.params.id, req.body, (erro, dados) => {
        if (erro) {
            res.status(400).send({ output: "Erro ao tentar atualizar " + erro });
            return;
        }
        res.status(200).send({ output: "atualizado com sucesso! " + dados });
    });


});
// Rota para apagar dados cadastrado
app.delete("/apagar/:id", cors(config), (req, res) => {
    Cadastros.findByIdAndDelete(req.params.id).then((rs) => {
        res.status(200).send({ output: "Produto apagado." });
    });
});

// ////////////////////////////////////////////////////////////////////////////////////////////////////
// Rota dos Administradores do site

app.get("/administradores", cors(config), (req, res) => {
    Administrador.find().then((rs) => {
        res.status(200).send({ output: rs })
    });
});
//localizar um produto por seu id
app.get("/administrador/:id", cors(config), (req, res) => {
    Administrador.findById(req.params.id).then((rs) => {
        res.status(200).send({ output: rs })
    });
});



// Rota para cadastrar os colaboradores e administradores 
app.post("/administrador/cadastro",cors(config), (req, res) => {
    // criando 7ª parte usando a ligação com a 6ª parte
    const dados = new Administrador(req.body);
    dados.save().then((rs)=>{
        res.status(201).send({output:"Dados cadastrados "+rs})
    }).catch((erro) => res.status(400).send({ output: "Erro na execução" + erro }))

});



// Rota para atualizar o cadastro
app.put("/atualizar/:id", cors(config), (req, res) => {

   
    Administrador.findByIdAndUpdate(req.params.id, req.body, (erro, dados) => {
        if (erro) {
            res.status(400).send({ output: "Erro ao tentar atualizar " + erro });
            return;
        }
        res.status(200).send({ output: "Dados atualizado com sucesso! " + dados });
    });


});
// Rota para apagar dados cadastrado
app.delete("/apagar/:id", cors(config), (req, res) => {
    Administrador.findByIdAndDelete(req.params.id).then((rs) => {
        res.status(200).send({ output: "Usuário Administrador apagado." });
    });
});





















// Criando a porta de conexão


app.listen(3350, () => console.log("Servidor online..."));  