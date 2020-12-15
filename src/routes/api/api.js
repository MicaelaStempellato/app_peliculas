var express = require('express');
var router = express.Router();
let apiController = require('../../controllers/api/apiController');
const moviesResource = require('../../request/moviesResource')

router.get('/movies', apiController.all);

router.post('/movies', apiController.all);

router.get('/movies/:id', apiController.one)

router.get('/naranja/movies', async(req, res) =>{
    try{
        let movies = await moviesResource.getAll()
        res.json(movies.data)
    }catch(error){
        console.log(error);
    }
    
});

router.get('/naranja/movies/:id', async(req, res) => {
    try{
        let movies = await moviesResource.getOne(req.params.id)
        res.json(movies.data)
    }catch(error){
        console.log(error);
    }
});

router.post('/naranja/movies', async(req, res) =>{
    try{
        let movies = await moviesResource.getAllPost(res.body)
        res.json(movies.data)
    }catch(error){
        console.log(error);
    }
    
});

module.exports = router;