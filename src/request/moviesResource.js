const axios = require('axios');
const {url, timeout} = require('./default')
module.exports = {
    getAll(){
        return axios({
            timeout,
            method: 'GET',
            url: url + 'movies'
        })
    },

    getOne(id){
        return axios({
            timeout,
            method: 'GET',
            url: url + 'movies/' + id,
            
        })
    },
    getAllPost(data){
        return axios({
            timeout,
            method: 'POST',
            url: url + 'movies',
            data
        })
    }
}