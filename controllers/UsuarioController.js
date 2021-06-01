const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
const knex = require('../database/dbConfig')

module.exports = {

    //index: listagem
    //store/create: inclusão
    //update: alteração
    //show: obter 1 registro
    //destroy: exclusão

    async index(req, res) {
        const usuarios = await knex('usuarios');
        res.status(200).json(usuarios);
    },

    async store(req, res) {

        const {nome, email, senha } = req.body;

        if(!nome || !email || !senha ) {
            res.status(400).json({erro: "Enviar nome, email e senha do usuário"});
            return;
        }

        try{
            const dados = await knex('usuarios').where({email});
            if(dados.length) {
                res.status(400).json({erro: "Email já cadastrado"});
                return;
            }
        } catch (error){
            res.status(400).json({erro: error.message});
            return
        }

        // Esconde a senha e adiciona 10 "salts"
        const hash = bcrypt.hashSync(senha, 10);
        
        try {
            const novo = await knex("usuarios").insert({nome, email, senha: hash});
            res.status(201).json({id: novo[0]});
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    },

    async login(req, res) {
        const { email, senha } = req.body;

        if(!email || !senha) {
            res.status(400).json({erro: "Login/Senha incorretos"});
            return;
        }

        try {
            const dados = await knex('usuarios').where({email});
            if( dados.length == 0) {
                res.status(400).json({erro: "Login/Senha incorretos"});
                return;
            }

            if(bcrypt.compareSync(senha, dados[0].senha)) {
               
                const token = jwt.sign({
                    usuario_id: dados[0].id,
                    usuario_nome: dados[0].nome
                },
                    process.env.JWT_KEY,
                    {expiresIn: "1h"}
                );
               
                res.status(200).json({ token })
            } else{
                res.status(400).json({erro: "Login/Senha incorretos"})
            }

        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }

}

