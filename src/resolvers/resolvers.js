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
        default: false
    },
    exit: {
        type: Boolean,
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
                const response = await Area.find({})
                return response;
            }
        // (parent, args, { models }) => {
        //     return Object.values(models.areas)}
        ,
        area:
            async (_, { name }) => {
                try {
                    var response = await Area.findOne({ name })
                    return response
                } catch (e) {
                    return e.response
                }
            }
        // (parent, { name }, { models }) => {
        //     return models.areas[name]}
    },
    Mutation: {
        createArea:
            async (_, args) => {
                try {
                    var response = await Area.create(args)
                    return response
                } catch (e) {
                    return e.response
                }
            }
        // (parent, {
        //     name,
        //     latitude,
        //     longitude,
        //     radius,
        // }, { models }) => {
        //     const newArea = {
        //         name,
        //         latitude,
        //         longitude,
        //         radius
        //     }
        //     models.areas[name] = newArea;
        //     return newArea;
        // }
        ,
        updateArea:
            async (_, args) => {
                try {
                    var response = await Area.findOneAndUpdate(args)
                    return response
                } catch (e) {
                    return e.response
                }
            }
        // (parent, {
        //     name,
        //     latitude,
        //     longitude,
        //     radius
        // }, { models }) => {
        //     const area = models.areas[name]
        //     if (latitude !== area.latitude) {
        //         area.latitude = latitude
        //     }
        //     if (longitude !== area.longitude) {
        //         area.longitude = longitude
        //     }
        //     if (radius !== area.radius) {
        //         area.radius = radius
        //     }
        //     return area;
        // }
        ,
        deleteArea:
            async (_, name) => {
                try {
                    var response = await Area.deleteOne(name)
                    return name
                } catch (e) {
                    return e.response
                }
            }
        // (parent, { name }, { models }) => {
        //     const { [name]: area, ...otherAreas } = models.areas
        //     models.areas = otherAreas
        //     return area
        // }
        ,
        createEvent:
            async (_, args) => {
                const name = args.name;
                try {
                    var response = await Area.findOneAndUpdate(name, { enter: args.enter, exit: args.exit, title: args.title, body: args.body })
                    return response;
                } catch (e) {
                    return e.response;
                }
            },
        // (parent, {
        //     name,
        //     enter,
        //     exit,
        //     bluetooth,
        //     notifications
        // }, { models }) => {
        //     const area = models.areas[name];
        //     if (enter) {
        //         if (area.enter === undefined) { area.enter = {} }
        //         if (bluetooth !== null) {
        //             area.enter.bluetooth = bluetooth
        //         }
        //         if (area.enter.notifications === undefined) { area.enter.notifications = [] };
        //         if (notifications !== null) {
        //             area.enter.notifications.push(notifications)
        //         }
        //     }
        //     if (exit) {
        //         if (area.exit === undefined) { area.exit = {} }
        //         if (bluetooth !== null) {
        //             area.exit.bluetooth = bluetooth
        //         }
        //         if (area.exit.notifications === undefined) { area.exit.notifications = [] };
        //         if (notifications !== null) {
        //             area.exit.notifications.push(notifications)
        //         }
        //     }
        //     return area
        // }
        updateEvent:
            async (_, args) => {
                try {
                    var response = Area.findOneAndUpdate(args);
                    return response;
                }
                catch (e) {
                    return e.response
                }
            }
        ,
        deleteEvent:
            async (_, args) => {
                const name = args.name;
                try {
                    var response = await Area.findOneAndUpdate(name, { enter: false, exit: false, title: null, body: null })
                    return response;
                }
                catch (e) {
                    return e.response;
                }
            }
    }
}