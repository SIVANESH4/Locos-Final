const mongoose = require('mongoose')

const ServicesScehma = mongoose.Schema({
    servicename:{type:'String'},
    servicedescription:{type:'String'},
    status:{type:'String',default:'Active'}
})
const Services = mongoose.model('Service',ServicesScehma)
module.exports = Services;