// module for tera-proxy
module.exports = function noMoreCrazyCapes(dispatch) {
    
    const timeout = 3000
    
    // variables
    let gameId = null,
        timeouts = {}
    
    // find gameID on login
    dispatch.hook('S_LOGIN', 9, event => {
        gameId = event.gameId
    })
    
    // when someone is loaded
    dispatch.hook('S_SPAWN_USER', 12, event => {
        check_appearance(event)
    })
    
    // when someone's equipment changes
    dispatch.hook('S_USER_EXTERNAL_CHANGE', 5, event => {
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
            accessoryTransform1,
            accessoryTransform2,
            accessoryTransform3,
            accessoryTransform4,
            accessoryTransform5,
            accessoryTransform6,
            accessoryTransform7,
            accessoryTransform8,
            accessoryTransform9,
            accessoryTransform10,
            accessoryTransform11,
            accessoryTransform12,
            accessoryTransform13,
            accessoryTransform14,
            accessoryTransform15,
            accessoryTransform16,
            accessoryTransform17,
            accessoryTransform18,
            accessoryTransform19,
            accessoryTransform20,
            accessoryTransform21,
            accessoryTransform22,
            accessoryTransform23,
            accessoryTransform24,
            accessoryTransform25,
            accessoryTransform26,
            accessoryTransform27,
            accessoryTransform28,
            accessoryTransform29,
            accessoryTransform30,
            accessoryTransform31,
            styleBodyDye,
            showStyle
        } = event
        dispatch.toClient('S_USER_EXTERNAL_CHANGE', 4, appearance)
    }
}
