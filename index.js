// module for tera-proxy
module.exports = function noMoreCrazyCapes(dispatch) {
    
    const timeout = 3000
    
    // variables
    let gameId = null,
        timeouts = new Map()
    
    // find gameID on login
    dispatch.hook('S_LOGIN', dispatch.majorPatchVersion >= 81 ? 13 : 12, event => {
        gameId = event.gameId
        clearAllTimeouts()
    })
    
    // when someone is loaded
    dispatch.hook('S_SPAWN_USER', 14, check_appearance)
    
    // when someone's equipment changes
    dispatch.hook('S_USER_EXTERNAL_CHANGE', 7, check_appearance)

    // S_LOAD_TOPO
    dispatch.hook('S_LOAD_TOPO', 'raw', clearAllTimeouts)

    // S_RETURN_TO_LOBBY
    dispatch.hook('S_RETURN_TO_LOBBY', 'raw', clearAllTimeouts)

    // clearAllTimeouts
    function clearAllTimeouts() {
        timeouts.forEach((value)=>{clearTimeout(value)})
        timeouts =  new Map()
    }

    // check_appearance
    function check_appearance(event) {
        // if character is not your character
        if (event.gameId != gameId) {
            // if timer was set, end it
            let value = timeouts.get(event.gameId)
            if (value) {
                    clearTimeout(value)
                    timeouts.delete(event.gameId)
            }
            // if using back costume, set timer to re-equip it
            if (event.styleBack != 0) {
                timeouts.set(event.gameId, setTimeout(refresh_appearance, timeout, event))
            }
        }
    }
    
    // reapply the external appearance
    function refresh_appearance(event) {
        timeouts.delete(event.gameId)
        dispatch.toClient('S_USER_EXTERNAL_CHANGE', 7, event)
    }
}
