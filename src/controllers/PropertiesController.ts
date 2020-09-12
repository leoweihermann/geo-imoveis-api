import knex from '../database/connection'
import { Request, Response } from 'express'

class PropertiesController {

    async index(request: Request, response: Response){

        const {neighborhood} = request.query;
        if(!!neighborhood){
            const points = await knex('properties')
                .select('*')
                .where('neighborhood', String(neighborhood))
            const serializedPoints = points.map(point => {
                return {
                    ...point,
                    image_url: `http://192.168.0.108:3333/uploads/${point.image}`
                }
            })

            return response.json(serializedPoints)
        }else{
            const points = await knex('properties')
                .select('*')

            const serializedPoints = points.map(point => {
                return {
                    ...point,
                    image_url: `http://192.168.0.108:3333/uploads/${point.image}`
                }
            })

            return response.json(serializedPoints)
        }

    }

    async show(request: Request, response: Response){)
        return response.json({})
    }

    async create(request: Request, response: Response) {

        const {
            description,
            bedrooms,
            bathrooms,
            garages,
            footage,
            price,
            city,
            uf,
            street,
            latitude,
            longitude,
            number,
            type,
            neighborhood
        } = request.body
    
    
        const trx = await knex.transaction();

        const property = {
            image: request.file.filename,
            description,
            bedrooms,
            bathrooms,
            garages,
            footage,
            price,
            city,
            uf,
            street,
            latitude,
            longitude,
            number,
            type,
            neighborhood
        }
        const insertedIds = await trx('properties').insert(property);
        const property_id = insertedIds[0]
        
        await trx.commit()
        return response.json({
            id: property_id,
        })
    }    
    
}

export default PropertiesController