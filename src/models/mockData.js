let areas = {
    "Home": {
        name: 'Home',
        latitude: 34.106340,
        longitude: -118.289310,
        radius: 0,
        enter: {
            notifications: [
                'Hello',
                'Welcome',
            ]
        }
    },
    "Work": {
        name: 'Work',
        latitude: 33.975750,
        longitude: -118.391140,
        radius: 0,
        exit: {
            bluetooth: true,
            notifications: [
                "Hello",
                "welcome"
            ]
        }
    }
}

export default {
    areas
}


// sample queries

// # mutation {
//     #   createArea(name:"test3", latitude:323.2, longitude:32.2, radius:12) {
//     #     name
//     #     latitude
//     #     longitude
//     #     radius
//     #   }
//     # }
    
//     # query {
//     #   areas {
//     #     name
//     #     latitude
//     #     longitude
//     #     radius
//     #     enter {
//     #       bluetooth
//     #       notifications
//     #     }
//     #     exit {
//     #       bluetooth
//     #       notifications
//     #     }
//     #   }
//     # }
    
//     # mutation {
//     #   createEvent(name:"test3", enter: true, exit:false, bluetooth:true
//     #   ) {
//     #     name
//     #   }
//     # }
    
//     # mutation {
//     #   deleteEvent(name:"test3", enter:true, exit:true, notifications:"no") {
//     #     name
//     #   }
//     # }
    
//     # mutation {
//     #   updateArea (name:"test3", radius:20) {
//     #     name
//     #     latitude
//     #     longitude
//     #     radius
//     #   }
//     # }
    
//     # mutation {
//     # deleteArea(name:"test3") {
//     #     name
//     #   }
//     # }