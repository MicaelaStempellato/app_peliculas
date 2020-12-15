let {Movie} = require('../../database/models');
module.exports = {
    all: async(req, res) => {
        try{
            let respuesta
            const movies = await Movie.findAll({include:['genero', 'actores']})
            if(movies.length > 0){
                respuesta = {
                    metadata: {
                        status: 200,
                        cantidad: movies.length
                    },
                    resultados: movies
                }
        }
        res.json(respuesta)
            
        }catch(error){
            console.log(error)
            res.render('error')
        }
    },

    one: async(req, res) => {
        try{
            let respuesta
            const movies = await Movie.findOne({include:['genero', 'actores']},{where:{id: req.params.id}})
            if(movies.length > 0){
                respuesta = {
                    metadata: {
                        status: 200,
                        cantidad: movies.length
                    },
                    resultados: movies
                }
        }
        res.json(respuesta)
            
        }catch(error){
            console.log(error)
            res.render('error')
        }
    }
}