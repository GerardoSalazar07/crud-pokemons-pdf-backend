import { Schema, model } from 'mongoose'

const PokemonSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    type: {
        type: String,
        required: [true, 'El tipo es obligatorio']
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    imageURL: {
        type: String
    }
})

PokemonSchema.methods.toJSON = function() {
    const { __v, _id, ...pokemon } = this.toObject()
    pokemon.id = _id
    return pokemon
}

export default model('Pokemon', PokemonSchema)