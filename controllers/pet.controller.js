const petModel = require('../models/pet.model')
const userModel = require('../models/user.model')

const auth = async (userId) => {

    const foundUser = await userModel.findById(userId) //findById função do mongoose para buscar o usuário pelo ID

    if (!foundUser)
        throw { error: 'Unauthorized', code: 401 }
}

module.exports = {
    async create(request, h) { //cria um contato

        const userId = request.headers.authorization //Obtém o usuário do header

        try {
            await auth(userId)
        } catch (error) {
            return h.response(error).code(error.code)
        }

        if (request.payload === null) //Questiona se o payload é nulo
            return h.response({ message: 'Not json' }).code(400)

        const pet = new petModel({
            userId: userId,
            petName: request.payload.petName,
            petSpecies: request.payload.petSpecies,
            petGender: request.payload.petGender,
            petBreed: request.payload.petBreed,
            petWeight: request.payload.petWeight,
            petBirth: request.payload.petBirth,
            petCastrated: request.payload.petCastrated,
            petAddress: {
                petAdStreet: request.payload.petAddress.petAdStreet,
                petAdNeighborhood: request.payload.petAddress.petAdNeighborhood,
                petAdNumber: request.payload.petAddress.petAdNumber,
                petAdInfo: request.payload.petAddress.petAdInfo,
                petAdCep: request.payload.petAddress.petAdCep,
                petAdCity: request.payload.petAddress.petAdCity,
                petAdState: request.payload.petAddress.petAdState,
                petAdCountry: request.payload.petAddress.petAdCountry,
            },
            petResponsible: {
                petRespFirstName: request.payload.petResponsible.petRespFirstName,
                petRespLastName: request.payload.petResponsible.petRespLastName,
                petRespContact1: request.payload.petResponsible.petRespContact1,
                petRespContact2: request.payload.petResponsible.petRespContact2,
                petRespPrincipal: request.payload.petResponsible.petRespPrincipal
            }
        })

        if (!pet.petName)
            return h.response({ message: 'Pet name is required.' }).code(409)

        if (!pet.petSpecies)
            return h.response({ message: 'Pet species is required.' }).code(409)

        if (!pet.petGender)
            return h.response({ message: 'Pet gender is required.' }).code(409)

        if (!pet.petBreed)
            return h.response({ message: 'Pet breed is required.' }).code(409)

        if (!pet.petWeight)
            return h.response({ message: 'Pet weight is required.' }).code(409)

        if (!pet.petBirth)
            return h.response({ message: 'Pet birth is required.' }).code(409)

        if (!pet.petCastrated)
            return h.response({ message: 'Question pet castrated is required.' }).code(409)


        if (!pet.petAddress.petAdStreet)
            return h.response({ message: 'Street is required.' }).code(409)

        if (!pet.petAddress.petAdNeighborhood)
            return h.response({ message: 'Neighborhood is required.' }).code(409)

        if (!pet.petAddress.petAdNumber)
            return h.response({ message: 'Address number is required.' }).code(409)

        if (!pet.petAddress.petAdInfo)
            return h.response({ message: 'Additional information is required.' }).code(409)

        if (!pet.petAddress.petAdCep)
            return h.response({ message: 'CEP is required.' }).code(409)

        if (!pet.petAddress.petAdCity)
            return h.response({ message: 'City is required.' }).code(409)

        if (!pet.petAddress.petAdState)
            return h.response({ message: 'State is required.' }).code(409)

        if (!pet.petAddress.petAdCountry)
            return h.response({ message: 'Country is required.' }).code(409)


        if (!pet.petResponsible.petRespFirstName)
            return h.response({ message: 'Responsable first name is required.' }).code(409)

        if (!pet.petResponsible.petRespLastName)
            return h.response({ message: 'Responsable last name is required.' }).code(409)

        if (!pet.petResponsible.petRespContact1)
            return h.response({ message: 'Primary contact number is required.' }).code(409)

        if (!pet.petResponsible.petRespContact2)
            return h.response({ message: 'Secondary contact number is required.' }).code(409)

        if (!pet.petResponsible.petRespPrincipal)
            return h.response({ message: 'Main responsible field is required.' }).code(409)

        const duplicated = await petModel.findOne({ petName: pet.petName, userId: userId }).exec();

        if (duplicated)
            return h.response({ error: 'Duplicated pet.' }).code(409)
        try {
            let result = await pet.save()
            console.log(pet)
            return h.response(result).code(200);
        } catch (error) {
            return h.response(error).code(500)
        }
    },
    async remove(request, h) {

        const userId = request.headers.authorization //Obtém o usuário do header

        try {
            await auth(userId)
        } catch (error) {
            return h.response(error).code(error.code)
        }

        try {

            const user = await petModel.findOne({ _id: request.params.petId, userId: userId }) //Irá buscar um contato com o contato ID passado no parâmetro que no caso é o ID do contato que será deletado do banco

            if (!user)
                return h.response({ error: 'There is no pet with that id.' }).code(404) //Se não encontrar um registro com o contatoId e UserId informado no header será exibido 404

            await petModel.deleteOne({ _id: request.params.petId, userId: userId }) //O campo precisa ser `_id` porque é a coluna do banco.
            return h.response({ message: 'Pet removed successfully.' }).code(204) //Código 204 (no content)
        } catch (error) {
            return h.response(error).code(500) //Se algum erro ocorrer será visualizado
        }
    },

    async list(request, h) {

        const userId = request.headers.authorization //Obtém o usuário do header

        try {
            await auth(userId)
        } catch (error) {
            return h.response(error).code(error.code)
        }

        const pets = await petModel.find({ userId: userId }).exec(); //Busca as modelagens no banco de dados
        return pets;
    },

    async getPetById(request, h) {

        const userId = request.headers.authorization // Obtém o usuário do header

        try {
            await auth(userId)
        } catch (error) {
            return h.response(error).code(error.code)
        }

        try {
            const pet = await petModel.findOne({ _id: request.params.petId, userId: userId }).exec() // Busca um pet com o petId e userId informados no header

            if (!pet)
                return h.response({ error: 'There is no pet with that id.' }).code(404) // Se não encontrar um registro com o petId e userId informados no header, exibe 404

            return h.response(pet).code(200) // Retorna o pet encontrado com o status 200
        } catch (error) {
            return h.response(error).code(500) // Se algum erro ocorrer, exibe o erro com o status 500
        }
    }

}

// async para ser assíncrona e ter uma promessa
// await entrega a promessa
// request é a requisição
// h é o retorno e pode ser manipulado como fizemos na constante contact (status code)
// Todos os métodos do mongoose trabalham com promessa. Então nossas funções `create(request, h)` precisam do async

// Adicionado autenticação e o cadastro de contatos só funcionará se o usuário tiver autorização o qual é passado no ID do headers que é o próprio token do usuário cadastrado no sistema
// Adicionado sistema de autenticação também dentro da função remove() para que seja deletado o contato apenas do usuário logado
// Adicionado sistema de autenticação para a função list() que só irá exibir os contatos relacionados ao ID do header