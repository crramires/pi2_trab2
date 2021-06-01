const express = require("express")
const routes = express.Router()

const JogosController = require('./controllers/JogosController');
const UsuarioController = require('./controllers/UsuarioController');
const DestaquesController = require('./controllers/DestaquesController');
const PropostaController = require('./controllers/PropostaController');
const login = require("./middleware/login");


// Rota de jogos
routes.get("/jogos", JogosController.index)
      .post("/jogos", login, JogosController.store)
      .delete("/jogos/:id", JogosController.destroy)
      .get("/filtro/:plataforma", JogosController.show)
      .get("/soma", JogosController.somaValor)
      


// Rota de Destaque
routes.put("/jogos/destacar/:id", DestaquesController.update)
      .get("/destaques", DestaquesController.destaque);


// Rota de Usuarios
routes.get("/usuarios", UsuarioController.index)
      .post("/usuarios", UsuarioController.store)
      .post("/login", UsuarioController.login);


//Rota de Proposta
routes.get("/proposta", PropostaController.index)
      .post("/proposta", PropostaController.store);

module.exports = routes;