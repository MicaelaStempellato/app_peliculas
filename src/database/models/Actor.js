const {sequelize, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const actor = sequelize.define('Actor', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        favorite_movie_id: DataTypes.INTEGER,

    })
    actor.associate = (models => {
        actor.belongsToMany(models.Movie, {
            as: 'peliculas',
            through: 'actor_movie'
        })
        actor.belongsTo(models.Movie, {
            as: 'fav_movie',
            foreignKey: 'favorite_movie_id'
        });

    })
    return actor
}
