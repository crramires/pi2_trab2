const knex = require('../database/dbConfig')


module.exports = {
    
    async destaque(req, res) {
        const destaques = await knex("jogos").where({destaque: true}).select("nome");
        res.status(200).json(destaques);
    },

    async update(req, res) {
        const id  = req.params.id;
        const { destaque } = req.body;
        
        const destaques = await knex("jogos").where("id", id).select("destaque");
    

        if(destaques[0] != undefined ){
            
            if(destaques[0].destaque == 0) {
                
                try {
                    await knex("jogos").where("id", id).update({destaque: true});
                    res.send("Ganhou um destaque.")
                } catch {error} {
                    res.status(400).json({erro: error.message});
                }
            } else if (destaques[0].destaque == 1) {
                try {
                    await knex("jogos").where("id", id).update({destaque: false});
                    res.send("Destaque removido.");
                } catch (error) {
                    res.status(400).json({erro: error.message})
                }
            }
        } else {
            res.status(400).json({msg: "Id invalido"});
        }

    }

}