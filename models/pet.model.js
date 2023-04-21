const mongoose = require('mongoose');

const Schema = mongoose.Schema

const petSchema = new Schema({
    petName: String,
    petSpecies: String,
    petGender: String,
    petBirth: String,
    petBreed: String,
    petAdStreet: String,
    petAdNeighborhood: String,
    petAdNumber: String,
    petAdInfo: String,
    petAdCep: String,
    petAdCity: String,
    petAdState: String,
    petResFirstName: String,
    petRespLastName: String,
    petRespContact1: String,
    petRespContact2: String,
    userId: String
});

module.exports = mongoose.model('Pet', petSchema);

// Criado o modelo de schema novo contato com nome, número, assunto e userId para que seja vinculado o contato a um usuário