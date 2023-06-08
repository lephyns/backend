const procedureModel = require('../models/procedure.model')
const userModel = require('../models/user.model')

const auth = async (userId) => {

    const foundUser = await userModel.findById(userId)

    if (!foundUser)
        throw { error: 'Unauthorized', code: 401 }
}

module.exports = {
    async create(request, h) {

        const userId = request.headers.authorization

        try {
            await auth(userId)
        } catch (error) {
            return h.response(error).code(error.code)
        }

        if (request.payload === null)
            return h.response({ message: 'Not json' }).code(400)

        const procedure = new procedureModel({
            userId: userId,
            petId: request.payload.petId,
            procedureName: request.payload.procedureName,
            procedureAddInfo: request.payload.procedureAddInfo,
            procedureDate: request.payload.procedureDate,
            procedureNextOne: request.payload.procedureNextOne,
            procedureRespDoctor: request.payload.procedureRespDoctor
        })

        if (!procedure.userId)
        return h.response({ message: 'User ID is required.' }).code(409)

        if (!procedure.procedureName)
            return h.response({ message: 'Procedure name is required.' }).code(409)

        if (!procedure.procedureAddInfo)
            return h.response({ message: 'Procedure additional information is required.' }).code(409)

        if (!procedure.procedureDate)
            return h.response({ message: 'Procedure date is required.' }).code(409)

        if (!procedure.procedureNextOne)
            return h.response({ message: 'Procedure next one is required.' }).code(409)

        if (!procedure.procedureRespDoctor)
            return h.response({ message: 'A doctor responsible for the procedure is required.' }).code(409)

        try {
            let result = await procedure.save()
            console.log(procedure)
            return h.response(result).code(200);
        } catch (error) {
            return h.response(error).code(500)
        }
    },
    async remove(request, h) {

        const userId = request.headers.authorization

        try {
            await auth(userId)
        } catch (error) {
            return h.response(error).code(error.code)
        }

        try {

            const procedure = await procedureModel.findOne({ _id: request.params.procedureId, userId: userId })

            if (!procedure)
                return h.response({ error: 'There is no procedure with that id.' }).code(404)

            await procedureModel.deleteOne({ _id: request.params.procedureId, userId: userId })
            return h.response({ message: 'Procedure removed successfully.' }).code(204)
        } catch (error) {
            return h.response(error).code(500)
        }
    },
    async list(request, h) {

        const userId = request.headers.authorization

        try {
            await auth(userId)
        } catch (error) {
            return h.response(error).code(error.code)
        }

        const procedures = await procedureModel.find({ userId: userId }).exec();
        return procedures;
    },

    async getProcedureById(request, h) {

        const userId = request.headers.authorization

        try {
            await auth(userId)
        } catch (error) {
            return h.response(error).code(error.code)
        }

        try {
            const procedure = await procedureModel.findOne({ _id: request.params.procedureId, userId: userId }).exec()

            if (!procedure)
                return h.response({ error: 'There is no procedure with that id.' }).code(404)

            return h.response(procedure).code(200)
        } catch (error) {
            return h.response(error).code(500)
        }
    },
    async getProcedureByPetId(request, h) {
        const userId = request.headers.authorization;

        try {
            await auth(userId);
        } catch (error) {
            return h.response(error).code(error.code);
        }

        try {
            const procedures = await procedureModel.find({ petId: request.params.petId }).exec();

            return h.response(procedures).code(200);
        } catch (error) {
            return h.response(error).code(500);
        }
    },
    async update(request, h) {
        const userId = request.headers.authorization;

        try {
            await auth(userId);
        } catch (error) {
            return h.response(error).code(error.code);
        }

        try {
            const procedure = await procedureModel.findOneAndUpdate(
                { _id: request.params.procedureId, userId: userId },
                { $set: request.payload },
                { new: true }
            ).exec();

            if (!procedure)
                return h.response({ error: 'There is no procedure with that id.' }).code(404);

            return h.response(procedure).code(200);
        } catch (error) {
            return h.response(error).code(500);
        }
    }
}