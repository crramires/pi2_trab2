const knex = require('../database/dbConfig')

module.exports = {

    //index: listagem
    //store/create: inclusão
    //update: alteração
    //show: obter 1 registro
    //destroy: exclusão

    async index(req, res) {
        
        const jogos = await knex
            .select("j.id","j.nome", "j.genero_id", "g.nome as genero", "j.plataforma", "j.preco", "j.foto")
            .from("jogos as j")
            .leftJoin("genero as g", "j.genero_id", "g.id")
            .orderBy("j.id", "desc");
        res.status(200).json(jogos);
    },

    async store(req, res) {

        const {nome, genero_id, plataforma, preco, foto} = req.body;

        if(!nome || !genero_id || !plataforma || !preco || !foto) {
            res.status(400).json({erro: "Enviar nome, genero_id, plataforma, preco e foto do jogo"});
            return;
        }

        try {
            const novo = await knex("jogos").insert({nome, genero_id, plataforma, preco, foto});
            res.status(201).json({id: novo[0]});
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    },

    async destroy(req, res) {

        try {

            const { id } = req.params;
            
            const deleteHandler = await knex('jogos').del().where({id});
            if(!deleteHandler){
                throw new Error("Não existe jogo com o id informado.");
            }

            res.send("Jogo deletado com sucesso.");
    
        } catch {
            res.send("Não deu certo.")
        }

    },

    async show(req, res) {
        
        try {
            const { plataforma } = req.params;
            const novo = await knex("jogos").where('plataforma', 'like', `%${plataforma}%`);
            if(!novo) {
                throw new Error("Não existe nenhum jogo dessa plataforma");
            }
            res.status(200).json(novo);

        } catch {
            res.send("Algo deu errado.");
        }
    
    },
    
    async somaValor(req, res) {
    
    const jogos = await knex.select("preco", knex.raw("COUNT(preco)")).from("jogos").groupByRaw("preco WITH ROLLUP");
  
      let somaTotal = 0;
      let numJogos = 0;
      for (i = 0; i < jogos.length - 1; i++) {
        const valores = jogos[i];
        somaTotal += Number(Object.values(valores)[0]) * Number(Object.values(valores)[1]);
        numJogos += Number(Object.values(valores)[1]);
      }
      somaTotal = Math.floor(somaTotal);
  
      res.status(200).json({msg: `A soma dos valores de todos os jogos é de R$ ${somaTotal.toFixed(2)} reais`,});
    },


}

