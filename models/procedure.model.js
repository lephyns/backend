var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var procedureSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    petId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'pet'
    },
    petProcedure: {
        procedureName: {
            type: String
        },
        procedureAddInfo: {
            type: String
        },
        procedureDate: {
            type: String
        },
        procedureNextOne: {
            type: String
        },
        procedureRespDoctor: {
            type: String
        }
    }
});

module.exports = mongoose.model('Procedure', procedureSchema);