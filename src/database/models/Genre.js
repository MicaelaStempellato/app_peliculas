const {sequelize, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const genre = sequelize.define('Genre', {
        name: DataTypes.STRING,
        ranking: DataTypes.INTEGER,
        active: DataTypes.INTEGER,
    });
    genre.associate = models => {
        genre.hasMany(models.Movie, {
            as: 'peliculas',
            foreignKey: 'genre_id'
        })
    }
    return genre
}
