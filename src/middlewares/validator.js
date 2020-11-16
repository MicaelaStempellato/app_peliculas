const {body} = require("express-validator");
var path = require("path")

module.exports={
    movie: [
        body("title")
        .notEmpty()
        .withMessage("El título es obligatorio")
        .bail()
        .isLength({min: 5, max: 120})
        .withMessage("Debe tener entre 5 y 120 caracteres"),
        body("rating")
        .notEmpty()
        .withMessage("El rating es obligatorio")
        .bail()
        .isFloat()
        .withMessage("El rating debe ser un número"),
        body("awards")
        .notEmpty()
        .withMessage("Los premios son obligatorios")
        .bail()
        .isInt()
        .withMessage("Los premios deben ser un número entero"),
        body("release_date")
        .notEmpty()
        .withMessage("La fecha de estreno es obligatoria"),
        body("length")
        .notEmpty()
        .withMessage("La duración es obligatoria")
        .bail()
        .isInt()
        .withMessage("La duració debe ser un número entero"),
        body("genre_id")
        .isLength({min: 1})
        .withMessage("El género es obligatorio")
        

    ]
}