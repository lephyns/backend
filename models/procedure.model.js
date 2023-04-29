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
    petVaccine: {
        vaccData: {
            type: String
        },
        vaccName: {
            type: String
        },
        vaccAddInfo: {
            type: String
        },
        vaccNextOne: {
            type: String
        },
        vaccRespDoctor: {
            type: String
        }
    },
    petVermifugation: {
        vermData: {
            type: String
        },
        vermName: {
            type: String
        },
        vermQty: {
            type: String
        },
        vermAddInfo: {
            type: String
        },
        vermNextOne: {
            type: String
        },
        vermRespDoctor: {
            type: String
        }
    },
    petAntiFlea: {
        fleaData: {
            type: String
        },
        fleaName: {
            type: String
        },
        fleaAddInfo: {
            type: String
        },
        fleaNextOne: {
            type: String
        },
        fleaRespDoctor: {
            type: String
        }
    },
    petOtherProcedure: {
        otherDate: {
            type: String
        },
        otherName: {
            type: String
        },
        otherAddInfo: {
            type: String
        },
        otherPetWeight: {
            type: Number
        },
        otherRespDoctor: {
            type: String
        }
    }
});

module.exports = mongoose.model('Procedure', procedureSchema);