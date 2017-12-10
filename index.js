// module for tera-proxy
module.exports = function noMoreCrazyCapes(dispatch) {
    
    // variables
    let cid = null,
    timeouts = {}
    
    // find your character ID on login
    dispatch.hook('S_LOGIN', 9, event => {
        cid = event.gameId
    })
    
    // update appearance when someone is loaded
    dispatch.hook('S_SPAWN_USER', 3, event => {
        // if character is your character
        if (event.cid.equals(cid)) {
            //do nothing
        }
        // if someone else
        else {
            // if timer was set, end it
            if (timeouts[event.cid]) {
                    clearTimeout(timeouts[event.cid])
                    timeouts[event.cid] = false
            }
            // if using back costume, set timer to re-equip it
            if (event.back != 0) {
                timeouts[event.cid] = setTimeout(refresh_appearance, 3000, event)
            }
        }
    })
    
    // update appearance when someone's equipment changes
    dispatch.hook('S_USER_EXTERNAL_CHANGE', 4, event => {
        // if character is your character
        if (event.gameId.equals(cid)) {
            //do nothing
        }
        // if someone else
        else {
            // if timer was set, end it
            if (timeouts[event.id]) {
                    clearTimeout(timeouts[event.id])
                    timeouts[event.id] = false
            }
            // if using back costume, set timer to re-equip it
            if (event.styleBack != 0) {
                timeouts[event.id] = setTimeout(refresh_appearance, 3000, event)
            }
        }
    })
    
    // reapply the external appearance
    function refresh_appearance(event) {
        timeouts[event.id] = false
        dispatch.toClient('S_USER_EXTERNAL_CHANGE', 1, event)
    }
}
