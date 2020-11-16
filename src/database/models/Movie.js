const {sequelize, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const movie = sequelize.define('Movie', {
        title: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        awards: DataTypes.INTEGER,
        release_date: DataTypes.DATEONLY,
        length: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER,

    })
    movie.associate = (models => {
        movie.belongsTo(models.Genre, {
            as: 'genero',
            foreignKey: 'genre_id'
        });
        movie.belongsToMany(models.Actor, {
            as: 'actores',
            through: 'actor_movie'
        })
        movie.hasMany(models.Actor, {
            as: 'actor_fav_movie',
            foreignKey: 'favorite_movie_id'
        })

    })
    return movie
}
