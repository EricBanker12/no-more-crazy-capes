// module for tera-proxy
module.exports = function noMoreCrazyCapes(dispatch) {
    
    const timeout = 3000
    
    // variables
    let gameId = null,
        timeouts = {}
    
    // find gameID on login
    dispatch.hook('S_LOGIN', 10, event => {
        gameId = event.gameId
    })
    
    // when someone is loaded
    dispatch.hook('S_SPAWN_USER', 13, event => {
        check_appearance(event)
    })
    
    // when someone's equipment changes
    dispatch.hook('S_USER_EXTERNAL_CHANGE', 6, event => {
       check_appearance(event)
    })

    // check_appearance
    function check_appearance(event) {
        // if character is not your character
        if (event.gameId != gameId) {
            // if timer was set, end it
            if (timeouts[event.gameId]) {
                    clearTimeout(timeouts[event.gameId])
                    timeouts[event.gameId] = false
            }
            // if using back costume, set timer to re-equip it
            if (event.styleBack != 0) {
                timeouts[event.gameId] = setTimeout(refresh_appearance, timeout, event)
            }
        }
    }
    
    // reapply the external appearance
    function refresh_appearance(event) {
        timeouts[event.id] = false
        let appearance = {
            gameId,
            weapon,
            body,
            hand,
            feet,
            underwear,
            head,
            face,
            weaponModel,
            bodyModel,
            handModel,
            feetModel,
            weaponDye,
            bodyDye,
            handDye,
            feetDye,
            underwearDye,
            styleBackDye,
            styleHeadDye,
            styleFaceDye,
            weaponEnchant,
            styleHead,
            styleFace,
            styleBack,
            styleWeapon,
            styleBody,
            styleFootprint,
            styleHeadScale,
            styleHeadRotation,
            styleHeadTranslation,
            styleHeadTranslationDebug,
            styleFaceScale,
            styleFaceRotation,
            styleFaceTranslation,
            styleFaceTranslationDebug,
            styleBackScale,
            styleBackRotation,
            styleBackTranslation,
            styleBackTranslationDebug,
            accessoryTransformUnk,
            styleBodyDye,
            showStyle
        } = event
        dispatch.toClient('S_USER_EXTERNAL_CHANGE', 6, appearance)
    }
}
