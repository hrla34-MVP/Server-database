import mongoose, { model } from 'mongoose';
import { isCompositeType } from 'graphql';
var Float = require('mongoose-float').loadType(mongoose);

const areaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    latitude: {
        type: Float,
        required: true
    },
    longitude: {
        type: Float,
        required: true
    },
    radius: {
        type: Number,
        required: true
    },
    enter: {
        type: Boolean,
        required: true,
        default: false
    },
    exit: {
        type: Boolean,
        required: true,
        default: false
    },
    title: {
        type: String
    },
    body: {
        type: String
    }

})
const Area = mongoose.model('Area', areaSchema)

export default {
    Query: {
        areas:
            async () => {
            try {
                var response = await Area.find({})
                return response;
            } catch (e) {
                return e.response
            }
        },
        area:
            async (_, { name }) => {
                try {
                    var response = await Area.findOne({ name })
                    return response
                } catch (e) {
                    return e.response
                }
            }
    },
    Mutation: {
        createArea:
            async (_, args) => {
                try {
                    var response = await Area.create(args)
                    return args
                } catch (e) {
                    return e.response
                }
            },
        updateArea:
            async (_, args) => {
                try {
                    var response = await Area.findOneAndUpdate({name: args.name}, args)
                    return args
                } catch (e) {
                    return e.response
                }
            },
        deleteArea:
            async (_, name) => {
                try {
                    var response = await Area.deleteOne(name)
                    return name
                } catch (e) {
                    return e.response
                }
            },
        updateEvent:
            async (_, args) => {
                try {
                    var response = Area.findOneAndUpdate({name: args.name}, args);
                    return args;
                }
                catch (e) {
                    return e.response
                }
            },
        deleteEvent:
            async (_, args) => {
                const name = args.name;
                try {
                    var response = await Area.findOneAndUpdate({ name }, { enter: false, exit: false, title: null, body: null })
                    return name;
                }
                catch (e) {
                    return e.response;
                }
            }
    }
}