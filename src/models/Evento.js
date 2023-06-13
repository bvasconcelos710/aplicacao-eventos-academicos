const mongoose = require('../db/mongo');


const eventoSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    dataInicio: { type: Date, default: Date.now },
    dataTermino: { type: Date, default: Date.now },
    latitude: String,
    longitude: String
}, { collection: 'eventos' });

eventoSchema.index({ titulo: 'text', descricao: 'text' }, { default_language: 'pt', weights: { titulo: 2, conteudo: 1 } });

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;