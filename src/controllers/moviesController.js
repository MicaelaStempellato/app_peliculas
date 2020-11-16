const {Movie, Actor, Genre} = require('../database/models');
const db = require('../database/models');
var moment = require('moment');
const { validationResult } = require('express-validator');



module.exports = {
    list: async (req, res, next) => {
        try{
            const moviesJson = await Movie.findAll()
            res.render('movies', { title: 'Todas las Pelis', movies: moviesJson });
            //const moviesJs = await moviesJson.json()
            //res.json(moviesJs)
        } catch (error){
            res.render('error')
        }
    //res.render('movies', { title: 'Las Pelis' });
  },
  detail: async (req, res, next) => {
      try{
        const movie = await Movie.findByPk(req.params.id, {include: ["genero", "actores"]})
        const fecha = moment(movie.release_date).format('ll')
        res.render('movieDetail', { title: 'La Peli' + " " + movie.title, movie: movie, fecha: fecha });
      } catch (error){
          console.log(error)
          res.render('error')
      }
  },

  new: async (req, res, next) => {
      try{
        const newMovies = await Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
        res.render('newMovies', { title: 'Las Últimas Pelis', newMovies: newMovies });
      }catch (error){
        res.render('error')
      }
  },

  recommended: async (req, res, next) => {
    try{
        const recommendedMovies = await Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte]:8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
        res.render('recommendedMovies', { title: 'Pelis Recomendadas', recommendedMovies: recommendedMovies });
    }catch (error){
        res.render('error')
      }
    },

    search: async (req, res, next) => {
        try{
            const movieResults = await Movie.findAll({
                where: {
                    title: {
                        [db.Sequelize.Op.like]: `%${req.body.buscar}%`
                      }
                    },
                order: [
                ['title', 'ASC']
                ]
                
            })
            res.render('searchResults', { title: 'Resultados de la Busqueda', movieResults: movieResults, busqueda: req.body.buscar });
        }catch (error){
            res.render('error')
          }
        },
    
    create: async (req, res, next) => {
        try{
            const generos = await Genre.findAll();
            res.render('createForm', {title: 'Crea una película', generos: generos})
        }catch (error){
            console.log(error)
            res.render('error')
          }
        
    },
    
    store: async (req, res, next) => {
        let errors = validationResult(req);
		if(errors.isEmpty()){
        try{
            await Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            })
            res.redirect('/movies')
        }catch (error){
            res.render('error')
          }
        } else {
            const oldfecha = moment(req.body.release_date).format('YYYY-MM-DD');
            const generos = await Genre.findAll();
			return res.render('createForm', {errors: errors.errors, old: req.body, title: 'Crea una película', generos: generos, oldfecha})
		}
    },

    edit: async (req, res, next) => {
        let pelicula = await Movie.findByPk(req.params.id, {include: ['genero']})
        const fecha = moment(pelicula.release_date).format('YYYY-MM-DD');
        console.log(fecha)
        const generos = await Genre.findAll();
        res.render('editForm', {title: 'Edita una película', pelicula : pelicula, generos, fecha})
    },

    update: async (req, res, next) => {
        let errors = validationResult(req);
		if(errors.isEmpty()){
        Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id
        },{
            where: {
                id: req.params.id
            }
        })
        res.redirect('/movies')
    } else {
        let pelicula = await Movie.findByPk(req.params.id, {include: ['genero']})
        const oldfecha = moment(req.body.release_date).format('YYYY-MM-DD');
        const generos = await Genre.findAll();
        return res.render('editForm', {errors: errors.errors, old: req.body, title: 'Edita una película', pelicula : pelicula, generos: generos, oldfecha})
    }
},

    delete: async (req, res, next) => {
        const lapeli = await Movie.findByPk(req.params.id, {include: 'actores'});
        await lapeli.removeActores(lapeli.actores);
        Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/movies');
    },

    genero: async (req, res, next) => {
        try{
            const genero = await Genre.findByPk(req.params.genero, {include: ["peliculas"]})
            res.render('genreDetail', { title: 'El Género' + " " + genero.name, genero: genero});
          } catch (error){
              console.log(error)
              res.render('error')
          }
    },

    actor: async (req, res, next) => {
        try{
            const actor = await Actor.findByPk(req.params.id, {include: ["peliculas", "fav_movie"]})
            res.render('actorDetail', { title: 'Perfil de actor', actor: actor});
          } catch (error){
              console.log(error)
              res.render('error')
          }
    },

    linkActor: async (req, res, next) => {
        try{
            const actors = await Actor.findAll();
            const movies = await Movie.findAll();
            res.render('linkMovieActor', { title: 'Una nueva actuación', actors, movies})
        } catch (error){
            console.log(error)
            res.render('error')
        }
    },

    saveLink: async (req, res, next) => {
        try{
            const movie = await Movie.findByPk(req.body.movie_id, {include: ['actores']});
            await movie.addActores(req.body.actor_id);

        res.redirect('/movies/detail/' + req.body.movie_id);

        } catch (error){
            console.log(error)
            res.render('error')
        }
    },

    listActors: async (req, res, next) => {
        try{
            const actorsJson = await Actor.findAll({
                order: [
                    ['first_name', 'ASC']
                ]
            })
            res.render('actors', { title: 'Todas los Actores', actors: actorsJson });
            //const moviesJs = await moviesJson.json()
            //res.json(moviesJs)
        } catch (error){
            res.render('error')
        }
    //res.render('movies', { title: 'Las Pelis' });
  },
    
}