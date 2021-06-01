const knex = require("../database/dbConfig");
const { index, store } = require("./UsuarioController");

module.exports = {

    async index(req, res) {

        const prop = await knex.select("p.id", "p.nome_comprador", "p.prop", "j.nome as jogos")
                                .from("proposta as p")
                                .leftJoin("jogos as j", "p.id", "j.id")
                                .orderBy("p.id", "desc")

        res.status(200).json(prop);
    },

    async store(req, res) {

        const { nome_comprador, proposta, jogo_id} = req.body;

        if(!nome_comprador || !proposta || !jogo_id) {

            res.status(400).json({erro: "Dados inválidos"});
            return;

        }  
        
        try {

            const newProp = await knex("proposta").insert({
                nome_comprador,
                prop,
                jogo_id,
            });
            
            res.status(201).json({id: newProp[0]});


        } catch (error) {
            res.status(400).json({erro: error.message});
        }


    }


}