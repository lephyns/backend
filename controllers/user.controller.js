const userModel = require('../models/user.model')
const md5 = require('md5')

module.exports = {

    //Função para criar um usuário, como estamos trabalhando com hapi.dev tem que ter a estrutura dele: request, h
    async create(request, h) { 
        //Questiona se o payload é nulo
        if (request.payload === null) 
            return h.response({ message: 'Not json' }).code(400)

        //Feito uma nova instancia para userModel 
        const user = new userModel({ 
            email: request.payload.email,
            //Com a pacote do node MD5 é criptografado a senha do usuário
            password: md5(request.payload.password), 
            fistName: request.payload.firstName,
            lastName: request.payload.lastName
        })

        //Verifica se o objeto user.name é undefined 
        if (!request.payload.email) 
            //Se cair dentro desse if irá devolver o status code 409. Se cair nesse if o código é finalizado
            return h.response({ message: 'E-mail is required.' }).code(409) 

        if (!request.payload.password)
            //Além de retornar o statuscode ele também devolve uma mensagem que é verificada no teste `post.test.js`
            return h.response({ message: 'Password is required.' }).code(409)

        if (!request.payload.firstName)
            return h.response({ message: 'First name is required.' }).code(409)

        if (!request.payload.lastName)
            return h.response({ message: 'Last name is required.' }).code(409)

        //Essa função busca um registro no banco para saber se já existe
        const duplicated = await userModel.findOne({ email: user.email }).exec(); 

        if (duplicated)
            //Retorna mensagem se o numero de telefone que está tentando cadastrar é o mesmo de um já existente
            return h.response({ error: 'Duplicated user.' }).code(409) 
        try {
            //Chamado o objeto user e invocado a função salvar. Desta forma será salvo as informações no banco de dados através do Mongoose
            let result = await user.save() 
            //Na `response` estamos enviando o resultado esperado. Chamado a função `code()` colocando o status 200
            return h.response(result).code(200); 
        } catch (error) {
            return h.response(error).code(500)
        }
    },

    //Função para fazer login
    async login(request, h) { 

        //Questiona se o payload é nulo
        if (request.payload === null) 
            return h.response({ message: 'Not json' }).code(400)

        if (!request.payload.email)
            return h.response({ message: 'E-mail is required.' }).code(409)

        if (!request.payload.password)
            return h.response({ message: 'Password is required.' }).code(409)

        const { email, password } = request.payload

        try {
            //Essa função busca um registro no banco para saber se já existe
            const user = await userModel.findOne({ email: email, password: md5(password) }).exec(); 

            if (!user)
                return h.response({ error: 'Unauthorized' }).code(401)

            return h.response({ user_token: user._id }).code(200)
        } catch (error) {
            return h.response(error).code(500)
        }
    }
}