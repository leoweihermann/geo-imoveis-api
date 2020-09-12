import express from 'express'
import { celebrate, Joi } from 'celebrate'
import PropertiesController from './controllers/PropertiesController'
import multer from 'multer'
import multerConfig from './config/multer'

const routes = express.Router()
const upload = multer(multerConfig)
const propertiesController = new PropertiesController()

routes.get('/properties', propertiesController.index)
routes.get('/properties/:id', propertiesController.show)

routes.post(
    '/properties',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            type: Joi.string().required(),
            description: Joi.string().required(),
            bedrooms: Joi.number().required(),
            bathrooms: Joi.number().required(),
            garages: Joi.number().required(),
            footage: Joi.number().required(),
            price: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            neighborhood: Joi.string().required(),
            street: Joi.string().required(),
            number: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
        })
    }, {
        abortEarly: false
    }),
    propertiesController.create
)

export default routes