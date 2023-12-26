import { response, request } from 'express'
import { jsPDF } from "jspdf"
import axios from 'axios'

import Pokemon from '../models/pokemon.js'

const createPokemon = async(req = request, res = response) => {
    const data = req.body
    const pokemon = new Pokemon(data)

    await pokemon.save()

    res.json({ pokemon })
}

const getPokemons = async(req = request, res = response) => {
    const pokemons = await Pokemon.find()

    res.json({ pokemons })
}

const getPokemon = async(req = request, res = response) => {
    const { id } = req.params
    const pokemon = await Pokemon.findById(id)
    const { name, type, height, weight, imageURL } = pokemon
   
    const doc = new jsPDF()

    if (imageURL) {
        const response = await axios.get(imageURL, { responseType: 'arraybuffer' })
        const imageData = Buffer.from(response.data, 'binary')
        doc.addImage(imageData, 'JPEG', 20, 20, 40, 40)
    }

    doc.text(`Nombre: ${name}`, 20, 70)
    doc.text(`Tipo: ${type}`, 20, 80)
    doc.text(`Altura: ${height}`, 20, 90)
    doc.text(`Peso: ${weight}`, 20, 100)

    const pdfBytes = doc.output('arraybuffer')

    res.type('application/pdf; charset=utf-8').send(Buffer.from(pdfBytes))
}

const updatePokemon = async(req = request, res = response) => {
    const { id } = req.params
    const data = req.body

    const pokemon = await Pokemon.findByIdAndUpdate(id, data, { new: true })

    res.json({ pokemon })
}

const deletePokemon = async(req = request, res = response) => {
    const { id } = req.params
    const pokemon = await Pokemon.findByIdAndDelete(id)

    res.json({ pokemon })
}

export {
    createPokemon,
    getPokemons,
    getPokemon,
    updatePokemon,
    deletePokemon
}