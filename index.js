// module for tera-proxy
module.exports = function noMoreCrazyCapes(dispatch) {
    
    // variables
    let gameId = null,
    timeouts = {}
    
    // find gameID on login
    dispatch.hook('S_LOGIN', 9, event => {
        gameId = event.gameId
    })
    
    // when someone is loaded
    dispatch.hook('S_SPAWN_USER', 11, event => {
        check_appearance(event)
    })
    
    // when someone's equipment changes
    dispatch.hook('S_USER_EXTERNAL_CHANGE', 4, event => {
       check_appearance(event)
    })

    // check_appearance
    function check_appearance(event) {
        // if character is not your character
        if (!event.gameId.equals(gameId)) {
            // if timer was set, end it
            if (timeouts[event.gameId]) {
                    clearTimeout(timeouts[event.gameId])
                    timeouts[event.gameId] = false
            }
            // if using back costume, set timer to re-equip it
            if (event.styleBack != 0) {
                timeouts[event.gameId] = setTimeout(refresh_appearance, 3000, event)
            }
        }
    }
    
    // reapply the external appearance
    function refresh_appearance(event) {
        timeouts[event.id] = false
        dispatch.toClient('S_USER_EXTERNAL_CHANGE', 1, event)
    }
}
