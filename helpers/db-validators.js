import Pokemon from '../models/pokemon.js'

const pokemonExistByName = async(name, id) => {
    const pokemonExist = await Pokemon.findOne({ name, _id: { $ne: id } })
    if (pokemonExist) {
        throw new Error(`El nombre ${name} ya existe`)
    }
}

const pokemonExistById = async(id) => {
    const pokemonExist = await Pokemon.findById(id)
    if (!pokemonExist) {
        throw new Error(`El id ${id} no existe`)
    }
}

export {
    pokemonExistByName,
    pokemonExistById
}