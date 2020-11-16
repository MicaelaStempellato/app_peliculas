var express = require('express');
//const { validator } = require('sequelize/types/lib/utils/validator-extras');
var router = express.Router();
let moviesController = require('../controllers/moviesController')
let productValidator = require('../middlewares/validator')

/* GET home page. */
router.get('/', moviesController.list);
router.get('/detail/:id', moviesController.detail);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recommended);
router.post('/resultados', moviesController.search);
router.get('/create', moviesController.create);
router.post('/create', productValidator.movie, moviesController.store);
router.get('/edit/:id', moviesController.edit);
router.put('/edit/:id', productValidator.movie, moviesController.update);
router.delete('/delete/:id', moviesController.delete);
router.get('/genero/:genero', moviesController.genero);
router.get('/actor/:id', moviesController.actor);
router.get('/linkActor', moviesController.linkActor);
router.post('/linkActor', moviesController.saveLink);
router.get('/listActors', moviesController.listActors)

module.exports = router;
