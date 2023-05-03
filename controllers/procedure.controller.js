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
            petVaccine: {
                vaccData: request.payload.petVaccine.vaccData,
                vaccName: request.payload.petVaccine.vaccName,
                vaccAddInfo: request.payload.petVaccine.vaccAddInfo,
                vaccNextOne: request.payload.petVaccine.vaccNextOne,
                vaccRespDoctor: request.payload.petVaccine.vaccRespDoctor
            },
            petVermifugation: {
                vermData: request.payload.petVermifugation.vermData,
                vermName: request.payload.petVermifugation.vermName,
                vermQty: request.payload.petVermifugation.vermQty,
                vermAddInfo: request.payload.petVermifugation.vermAddInfo,
                vermNextOne: request.payload.petVermifugation.vermNextOne,
                vermRespDoctor: request.payload.petVermifugation.vermRespDoctor
            },
            petAntiFlea: {
                fleaData: request.payload.petAntiFlea.fleaData,
                fleaName: request.payload.petAntiFlea.fleaName,
                fleaAddInfo: request.payload.petAntiFlea.fleaAddInfo,
                fleaNextOne: request.payload.petAntiFlea.fleaNextOne,
                fleaRespDoctor: request.payload.petAntiFlea.fleaRespDoctor
            },
            petOtherProcedure: {
                otherDate: request.payload.petOtherProcedure.otherDate,
                otherName: request.payload.petOtherProcedure.otherName,
                otherAddInfo: request.payload.petOtherProcedure.otherAddInfo,
                otherPetWeight: request.payload.petOtherProcedure.otherPetWeight,
                otherRespDoctor: request.payload.petOtherProcedure.otherRespDoctor
            }
        })

        if (!procedure.petVaccine.vaccData)
            return h.response({ message: 'Vaccine data is required.' }).code(409)

        if (!procedure.petVaccine.vaccName)
            return h.response({ message: 'Vaccine name is required.' }).code(409)

        if (!procedure.petVaccine.vaccAddInfo)
            return h.response({ message: 'Vaccine additional information is required.' }).code(409)

        if (!procedure.petVaccine.vaccNextOne)
            return h.response({ message: 'Next vaccine date is required.' }).code(409)

        if (!procedure.petVaccine.vaccRespDoctor)
            return h.response({ message: 'A doctor responsible for the vaccine is required.' }).code(409)


        if (!procedure.petVermifugation.vermData)
            return h.response({ message: 'Vermifugation data is required.' }).code(409)

        if (!procedure.petVermifugation.vermName)
            return h.response({ message: 'Vermifugation name is required.' }).code(409)

        if (!procedure.petVermifugation.vermQty)
            return h.response({ message: 'Vermifugation quantity is required.' }).code(409)

        if (!procedure.petVermifugation.vermAddInfo)
            return h.response({ message: 'Vermifugation additional information is required.' }).code(409)

        if (!procedure.petVermifugation.vermNextOne)
            return h.response({ message: 'Next vermifugation date is required.' }).code(409)

        if (!procedure.petVermifugation.vermRespDoctor)
            return h.response({ message: 'A doctor responsible for the vermifugation is required.' }).code(409)


        if (!procedure.petAntiFlea.fleaData)
            return h.response({ message: 'Anti-flea data is required.' }).code(409)

        if (!procedure.petAntiFlea.fleaName)
            return h.response({ message: 'Anti-flea name is required.' }).code(409)

        if (!procedure.petAntiFlea.fleaAddInfo)
            return h.response({ message: 'Anti-flea additional information is required.' }).code(409)

        if (!procedure.petAntiFlea.fleaNextOne)
            return h.response({ message: 'Next anti-flea date is required.' }).code(409)

        if (!procedure.petAntiFlea.fleaRespDoctor)
            return h.response({ message: 'A doctor responsible for the anti-flea is required.' }).code(409)


        if (!procedure.petOtherProcedure.otherDate)
            return h.response({ message: 'Procedure data is required.' }).code(409)

        if (!procedure.petOtherProcedure.otherName)
            return h.response({ message: 'Procedure name is required.' }).code(409)

        if (!procedure.petOtherProcedure.otherAddInfo)
            return h.response({ message: 'Procedure additional information is required.' }).code(409)

        if (!procedure.petOtherProcedure.otherPetWeight)
            return h.response({ message: 'Pet weight is required.' }).code(409)

        if (!procedure.petOtherProcedure.otherRespDoctor)
            return h.response({ message: 'A doctor responsible for the procedure is required.' }).code(409)


        // const duplicated = await procedureModel.findOne({ petId: request.payload.petId, userId: userId, vaccine: procedure.petVaccine.vaccName}).exec();

        // if (duplicated)
        //     return h.response({ error: 'Duplicated vaccine.' }).code(409)


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
    }

}