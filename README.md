## No More Crazy Capes
Tera-Proxy module for Tera Online. Fixes cape exploding physics glitch by re-equipping back items of other players 3 seconds after they load/change equipment.
### Requirements
[Tera-Proxy](https://github.com/meishuu/tera-proxy) and dependencies

The following opcodes must be mapped in your `tera-proxy/node_modules/tera-data/map/protocol.{version}.map` file:
* S_LOGIN
* S_SPAWN_USER
* S_USER_EXTERNAL_CHANGE
