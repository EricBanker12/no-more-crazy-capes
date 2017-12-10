module.exports = function noMoreCrazyCapes(dispatch) {

  let ownGameId = null,

  timeouts = Object.create(null),

  refreshAppearance = event => {
    const gameId = String(event.gameId);
    timeouts[gameId] = null;
    dispatch.toClient("S_USER_EXTERNAL_CHANGE", 4, event);
  },

  hookFn = event => {
    const gameId = String(event.gameId);
    if (gameId !== ownGameId) {
      if (timeouts[gameId]) {
        clearTimeout(timeouts[gameId]);
        timeouts[gameId] = null;
      }
      if (event.styleBack !== 0) {
        timeouts[gameId] = setTimeout(refreshAppearance, 3000, event);
      }
    }
  };

  dispatch.hook("S_LOGIN", 9, event => { ownGameId = String(event.gameId) });

  dispatch.hook("S_SPAWN_USER", 11, hookFn);
  dispatch.hook("S_USER_EXTERNAL_CHANGE", 4, hookFn);
};
