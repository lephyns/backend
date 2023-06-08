const petController = require('../controllers/pet.controller')

module.exports = [
    {
        method: 'GET',
        path: '/pet',
        handler: petController.list
    },
    {
        method: 'POST', 
        path: '/pet',
        handler: petController.create
    },
    {
        method: 'DELETE', 
        path: '/pet/{petId}',
        handler: petController.remove
    },
    {
        method: 'GET',
        path: '/pet/{petId}',
        handler: petController.getPetById
    },
    {
        method: 'PATCH',
        path: '/pet/{petId}',
        handler: petController.update
    }
]

// Method é o tipo da requisição
// Path é onde será feita essa requisição (endpoint)
// Handler é o que será feito nela
// Essas funções criadas (list, create) estão localizadas no arquivo `contact.controller.js`

