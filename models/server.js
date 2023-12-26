import express from 'express'
import cors from 'cors'

import { dbConnection } from '../database/config.js'
import pokemons from '../routes/pokemons.js'

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.pokemonsPath = '/pokemons'

        // Conectar a base de datos
        this.connectDB()

        // Middlewares
        this.middlewares()

        // Rutas de mi aplicación
        this.routes()
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio Público
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.pokemonsPath, pokemons)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}

export default Server