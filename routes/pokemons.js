import { Router } from 'express'
import { check } from 'express-validator'

import { validateFields } from '../middlewares/validate-fields.js'
import { createPokemon, getPokemons, getPokemon, updatePokemon, deletePokemon } from '../controllers/pokemons.js'
import { pokemonExistByName, pokemonExistById } from '../helpers/db-validators.js'

const router = Router()

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom((name) => pokemonExistByName(name)),
    check('type', 'El tipo es obligatorio').not().isEmpty(),
    check('height', 'La altura no es válida').optional({ nullable: true, checkFalsy: true }).isNumeric(),
    check('weight', 'El peso no es válido').optional({ nullable: true, checkFalsy: true }).isNumeric(),
    validateFields
] , createPokemon)

router.get('/', getPokemons)

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(pokemonExistById),
    validateFields
], getPokemon)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(pokemonExistById),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom((name, { req: { params: { id } } }) => pokemonExistByName(name, id)),
    check('type', 'El tipo es obligatorio').not().isEmpty(),
    check('height', 'La altura no es válida').optional({ nullable: true, checkFalsy: true }).isNumeric(),
    check('weight', 'El peso no es válido').optional({ nullable: true, checkFalsy: true }).isNumeric(),
    validateFields
], updatePokemon)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(pokemonExistById),
    validateFields
], deletePokemon)

export default router