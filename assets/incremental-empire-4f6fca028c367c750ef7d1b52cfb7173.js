"use strict"
define("incremental-empire/adapters/application",["exports","ember-local-storage/adapters/local"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/app",["exports","incremental-empire/resolver","ember-load-initializers","incremental-empire/config/environment"],function(e,t,n,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:t.default});(0,n.default)(a,r.default.modulePrefix)
var i=a
e.default=i}),define("incremental-empire/components/fa-icon",["exports","@fortawesome/ember-fontawesome/components/fa-icon"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/controllers/application",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({isManaHidden:Ember.computed.not("model.manaUnlocked"),isCultureHidden:Ember.computed.not("model.cultureUnlocked"),isMoneyHidden:Ember.computed.not("model.moneyUnlocked"),isScienceHidden:Ember.computed.not("model.scienceUnlocked"),actions:{nextTurn:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),this.game.empire.nextTurn()
case 2:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/empire/population",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({isGenPopulationOnCooldown:Ember.computed("model.{lastGenPopulationTurn,turn}",function(){return this.model.lastGenPopulationTurn==this.model.get("turn")}),actions:{genPopulation:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,this.model.genPopulation()
case 3:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/empire/ressources/food",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({actions:{genFood:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,this.model.genRessource("food")
case 3:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/settings",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({actions:{destroyEverything:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!window.confirm("Are you sure? This will lose all your game progress and cannot be recovered in any way.")){e.next=8
break}return e.next=5,window.localStorage.clear()
case 5:return e.next=7,this.game.load()
case 7:this.transitionToRoute("index")
case 8:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/templates",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({actions:{rebirth:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,this.game.rebirth()
case 3:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/upgrades",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({displayedUpgrades:Ember.computed.filterBy("model","isActive",!1),actions:{buy:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.game.buyUpgrade(t)
case 2:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/helpers/app-version",["exports","incremental-empire/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n){function r(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.default.APP.version,i=r.versionOnly||r.hideSha,o=r.shaOnly||r.hideVersion,s=null
return i&&(r.showExtended&&(s=a.match(n.versionExtendedRegExp)),s||(s=a.match(n.versionRegExp))),o&&(s=a.match(n.shaRegExp)),s?s[0]:a}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=r,e.default=void 0
var a=Ember.Helper.helper(r)
e.default=a}),define("incremental-empire/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("incremental-empire/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("incremental-empire/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","incremental-empire/config/environment"],function(e,t,n){var r,a
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n.default.APP&&(r=n.default.APP.name,a=n.default.APP.version)
var i={name:"App Version",initialize:(0,t.default)(r,a)}
e.default=i}),define("incremental-empire/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=n}),define("incremental-empire/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"ember-data",initialize:t.default}
e.default=r}),define("incremental-empire/initializers/export-application-global",["exports","incremental-empire/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var r,a=t.default.exportApplicationGlobal
r="string"==typeof a?a:Ember.String.classify(t.default.modulePrefix),n[r]||(n[r]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[r]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default=void 0
var r={name:"export-application-global",initialize:n}
e.default=r}),define("incremental-empire/initializers/game",["exports"],function(e){function t(e){e.inject("route","game","service:game"),e.inject("template","game","service:game"),e.inject("controller","game","service:game"),e.inject("model","game","service:game")}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=t,e.default=void 0
var n={initialize:t}
e.default=n}),define("incremental-empire/initializers/local-storage-adapter",["exports","ember-local-storage/initializers/local-storage-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"initialize",{enumerable:!0,get:function(){return t.initialize}})}),define("incremental-empire/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:t.default}
e.default=n}),define("incremental-empire/models/empire",["exports","ember-data"],function(e,t){function n(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}function r(e){return function(){var t=this,r=arguments
return new Promise(function(a,i){var o=e.apply(t,r)
function s(e){n(o,a,i,s,l,"next",e)}function l(e){n(o,a,i,s,l,"throw",e)}s(void 0)})}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default.Model,i=t.default.attr,o=a.extend({turn:i("number",{defaultValue:0}),population:i("number",{defaultValue:1}),food:i("number",{defaultValue:0}),wood:i("number",{defaultValue:0}),stone:i("number",{defaultValue:0}),metal:i("number",{defaultValue:0}),energy:i("number",{defaultValue:0}),lastGenPopulationTurn:i("number",{defaultValue:void 0}),nextManaPoints:Ember.computed("population","turn",function(){var e=this.population,t=this.turn
return e>1&&t>20?Math.max(0,Math.floor(Math.sqrt((e-1)*(t/10-1)))):0}),genPopulation:function(){var e=r(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.set("population",this.population+1),this.set("lastGenPopulationTurn",this.turn),e.next=4,this.save()
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),genRessource:function(){var e=r(regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=1,this.game.upgrades.get("Click Power").isActive&&this.game.universe.mana>0&&(n=this.game.universe.mana),this.set(t,this.get(t)+n),e.next=5,this.save()
case 5:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),nextTurn:function(){var e=r(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.food>=this.population?this.set("food",this.food-this.population):(this.set("population",this.food),this.set("food",0)),this.set("turn",this.turn+1),e.next=4,this.save()
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}()})
e.default=o}),define("incremental-empire/models/universe",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model,r=t.default.attr,a=n.extend({name:r("string",{defaultValue:"Incremental Empire"}),mana:r("number",{defaultValue:0}),culture:r("number",{defaultValue:0}),money:r("number",{defaultValue:0}),science:r("number",{defaultValue:0}),manaUnlocked:r("boolean",{defaultValue:!1}),cultureUnlocked:r("boolean",{defaultValue:!1}),moneyUnlocked:r("boolean",{defaultValue:!1}),scienceUnlocked:r("boolean",{defaultValue:!1})})
e.default=a}),define("incremental-empire/models/upgrade",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model,r=t.default.attr,a=n.extend({name:r("string",{defaultValue:""}),description:r("string",{defaultValue:""}),manaCost:r("number",{defaultValue:0}),cultureCost:r("number",{defaultValue:0}),moneyCost:r("number",{defaultValue:0}),scienceCost:r("number",{defaultValue:0}),isActive:r("boolean",{defaultValue:!1}),globalCost:Ember.computed("manaCost","cultureCost","moneyCost","scienceCost",function(){return this.manaCost+this.cultureCost+this.moneyCost+this.scienceCost}),cannotBuy:Ember.computed("game.universe.{mana,culture,money,science}","manaCost","cultureCost","moneyCost","scienceCost",function(){return this.manaCost>this.game.universe.mana||this.cultureCost>this.game.universe.culture||this.moneyCost>this.game.universe.money||this.scienceCost>this.game.universe.science})})
e.default=a}),define("incremental-empire/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("incremental-empire/router",["exports","incremental-empire/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){this.route("empire",function(){this.route("population"),this.route("ressources",function(){this.route("food"),this.route("wood"),this.route("stone"),this.route("metal"),this.route("energy")})}),this.route("upgrades"),this.route("templates"),this.route("achievements"),this.route("settings")})
var r=n
e.default=r}),define("incremental-empire/routes/achievements",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/application",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Route.extend({model:function(){var e,n=(e=regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.game.load()
case 2:return e.abrupt("return",this.game.universe)
case 3:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(){return n.apply(this,arguments)}}()})
e.default=n}),define("incremental-empire/routes/empire",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(){return this.game.empire}})
e.default=t}),define("incremental-empire/routes/empire/population",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/empire/ressources",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/empire/ressources/energy",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t})
define("incremental-empire/routes/empire/ressources/food",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/empire/ressources/metal",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/empire/ressources/stone",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/empire/ressources/wood",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/settings",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/templates",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/upgrades",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({upgradesModel:Ember.computed("this.game.upgrades",function(){var e=Ember.A(),t=!0,n=!1,r=void 0
try{for(var a,i=this.game.upgrades.values()[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var o=a.value
e.pushObject(o)}}catch(s){n=!0,r=s}finally{try{t||null==i.return||i.return()}finally{if(n)throw r}}return e}),model:function(){return this.upgradesModel}})
e.default=t}),define("incremental-empire/serializers/application",["exports","ember-local-storage/serializers/serializer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/services/game-template",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Service.extend({store:Ember.inject.service("store"),universe:void 0,empire:void 0,upgrades:void 0,generate:function(){var e,n=(e=regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.createRecord("universe")
case 2:return this.universe=e.sent,e.next=5,this.store.createRecord("empire")
case 5:return this.empire=e.sent,e.next=8,this.store.createRecord("upgrade",{name:"Click Power",manaCost:1,description:"Your god powers for generating ressources is multiplied by your current mana"})
case 8:e.t0=e.sent,this.upgrades=[e.t0]
case 10:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(){return n.apply(this,arguments)}}()})
e.default=n}),define("incremental-empire/services/game",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}function n(e){return function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Service.extend({store:Ember.inject.service("store"),gameTemplate:Ember.inject.service("game-template"),universe:void 0,empire:void 0,upgrades:void 0,load:function(){var e=n(regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("universe")
case 2:return t=e.sent,this.universe=t.get("firstObject"),e.next=6,this.store.findAll("empire")
case 6:return t=e.sent,this.empire=t.get("firstObject"),e.next=10,this.store.findAll("upgrade").then(function(e){var t=new Map
return e.forEach(function(e){return t.set(e.name,e)}),t})
case 10:return this.upgrades=e.sent,e.next=13,this.consolidateSave()
case 13:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),consolidateSave:function(){var e=n(regeneratorRuntime.mark(function e(){var t,n,r
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.gameTemplate.generate()
case 2:if(null!=this.universe){e.next=6
break}return this.universe=this.gameTemplate.universe,e.next=6,this.universe.save()
case 6:if(null!=this.empire){e.next=10
break}return this.empire=this.gameTemplate.empire,e.next=10,this.empire.save()
case 10:t=0
case 11:if(!(t<this.gameTemplate.upgrades.length)){e.next=43
break}if(n=this.gameTemplate.upgrades[t],null!=(r=this.upgrades.get(n.name))){e.next=20
break}return this.upgrades.set(n.name,n),e.next=18,n.save()
case 18:e.next=40
break
case 20:if(r.manaCost==n.manaCost){e.next=24
break}return r.set("manaCost",n.manaCost),e.next=24,r.save()
case 24:if(r.cultureCost==n.cultureCost){e.next=28
break}return r.set("cultureCost",n.cultureCost),e.next=28,r.save()
case 28:if(r.moneyCost==n.moneyCost){e.next=32
break}return r.set("moneyCost",n.moneyCost),e.next=32,r.save()
case 32:if(r.scienceCost==n.scienceCost){e.next=36
break}return r.set("scienceCost",n.scienceCost),e.next=36,r.save()
case 36:if(r.description==n.description){e.next=40
break}return r.set("description",n.description),e.next=40,r.save()
case 40:t++,e.next=11
break
case 43:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),rebirth:function(){var e=n(regeneratorRuntime.mark(function e(){var t,n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.empire.nextManaPoints,this.empire.destroyRecord(),e.next=4,this.store.createRecord("empire")
case 4:return n=e.sent,this.set("empire",n),e.next=8,this.empire.save()
case 8:return this.universe.set("mana",this.universe.mana+t),this.universe.mana>0&&!this.universe.manaUnlocked&&this.universe.set("manaUnlocked",!0),e.next=12,this.universe.save()
case 12:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),buyUpgrade:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.cannotBuy||t.isActive){e.next=10
break}return t.set("isActive",!0),e.next=4,t.save()
case 4:return t.manaCost>0&&this.universe.set("mana",this.universe.mana-t.manaCost),t.cultureCost>0&&this.universe.set("culture",this.universe.culture-t.cultureCost),t.moneyCost>0&&this.universe.set("money",this.universe.money-t.moneyCost),t.scienceCost>0&&this.universe.set("science",this.universe.science-t.scienceCost),e.next=10,this.universe.save()
case 10:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}()})
e.default=r}),define("incremental-empire/templates/achievements",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"HXhl+eE4",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/achievements.hbs"}})
e.default=t}),define("incremental-empire/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"tSdTU365",block:'{"symbols":[],"statements":[[7,"nav"],[11,"class","navbar navbar-expand-lg navbar-light bg-light"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["navbar-brand","index"]],{"statements":[[0,"    "],[1,[25,["model","name"]],false],[0,"\\n"]],"parameters":[]},null],[0,"  "],[7,"div"],[11,"class","navbar-collapse"],[11,"id","navbarSupportedContent"],[9],[0,"\\n    "],[7,"ul"],[11,"class","navbar-nav mr-auto"],[9],[0,"\\n      "],[7,"li"],[11,"class","nav-item mx-2"],[9],[5,"fa-icon",[],[["@icon"],["users"]]],[0," "],[1,[25,["game","empire","population"]],false],[10],[0,"\\n      "],[7,"li"],[11,"class","nav-item mx-2"],[9],[5,"fa-icon",[],[["@icon"],["smile"]]],[0," 67%"],[10],[0,"\\n    "],[10],[0,"\\n    "],[7,"button"],[11,"class","mx-auto btn btn-secondary"],[12,"onclick",[29,"action",[[24,0,[]],"nextTurn"],null]],[11,"type","button"],[9],[0,"Turn "],[1,[25,["game","empire","turn"]],false],[10],[0,"\\n    "],[7,"ul"],[11,"class","navbar-nav"],[9],[0,"\\n      "],[7,"li"],[11,"class","nav-item mx-2"],[12,"hidden",[23,"isManaHidden"]],[9],[5,"fa-icon",[],[["@icon"],["dot-circle"]]],[0," "],[1,[25,["model","mana"]],false],[10],[0,"\\n      "],[7,"li"],[11,"class","nav-item mx-2"],[12,"hidden",[23,"isCultureHidden"]],[9],[5,"fa-icon",[],[["@icon"],["book"]]],[0," "],[1,[25,["model","culture"]],false],[10],[0,"\\n      "],[7,"li"],[11,"class","nav-item mx-2"],[12,"hidden",[23,"isMoneyHidden"]],[9],[5,"fa-icon",[],[["@icon"],["coins"]]],[0," "],[1,[25,["model","money"]],false],[10],[0,"\\n      "],[7,"li"],[11,"class","nav-item mx-2"],[12,"hidden",[23,"isScienceHidden"]],[9],[5,"fa-icon",[],[["@icon"],["flask"]]],[0," "],[1,[25,["model","science"]],false],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"ul"],[11,"class","nav nav-tabs"],[9],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","empire.population"]],{"statements":[[0,"        Population\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","empire.ressources"]],{"statements":[[0,"        Ressources\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","upgrades"]],{"statements":[[0,"        Upgrades\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","templates"]],{"statements":[[0,"        Templates\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","achievements"]],{"statements":[[0,"        Achievements\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item ml-auto"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","settings"]],{"statements":[[0,"        Settings\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/application.hbs"}})
e.default=t}),define("incremental-empire/templates/empire",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"/4ipnO3N",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/population",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"X37tVLFr",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"button"],[11,"class","btn btn-outline-success my-2"],[12,"disabled",[23,"isGenPopulationOnCooldown"]],[12,"onclick",[29,"action",[[24,0,[]],"genPopulation"],null]],[11,"type","button"],[9],[0,"Spontaneous Generation"],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/population.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/ressources",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"Ip90OVBZ",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"div"],[11,"class","row"],[9],[0,"\\n    "],[7,"nav"],[11,"class","nav nav-pills flex-column border-right"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","empire.ressources.food"]],{"statements":[[0,"        Food "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","food"]],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","empire.ressources.wood"]],{"statements":[[0,"        Wood "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","wood"]],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","empire.ressources.stone"]],{"statements":[[0,"        Stone "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","stone"]],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","empire.ressources.metal"]],{"statements":[[0,"        Metal "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","metal"]],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","empire.ressources.energy"]],{"statements":[[0,"        Energy "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","energy"]],false],[10],[0,"\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"div"],[11,"class","ml-2 mt-2"],[9],[0,"\\n      "],[1,[23,"outlet"],false],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/ressources.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/ressources/energy",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"AEnx6NAF",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/ressources/energy.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/ressources/food",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"c2AyH6y5",block:'{"symbols":[],"statements":[[0,"Food is here.\\n"],[7,"button"],[11,"class","btn btn-outline-success my-2"],[12,"onclick",[29,"action",[[24,0,[]],"genFood"],null]],[11,"type","button"],[9],[0,"Horn of Plenty"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/ressources/food.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/ressources/metal",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"qenhpwZs",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/ressources/metal.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/ressources/stone",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"HMFpmwQY",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/ressources/stone.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/ressources/wood",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"pmx4XBbE",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/ressources/wood.hbs"}})
e.default=t}),define("incremental-empire/templates/settings",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"3pjgThAK",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"button"],[11,"class","btn btn-outline-danger my-2 mx-auto"],[12,"onclick",[29,"action",[[24,0,[]],"destroyEverything"],null]],[11,"type","button"],[9],[0,"Clear save data"],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/settings.hbs"}})
e.default=t}),define("incremental-empire/templates/templates",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"/hD0xx1I",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"button"],[11,"class","btn btn-outline-danger my-2"],[12,"onclick",[29,"action",[[24,0,[]],"rebirth"],null]],[11,"type","button"],[9],[0,"End Empire for "],[1,[25,["game","empire","nextManaPoints"]],false],[0," mana points"],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/templates.hbs"}})
e.default=t}),define("incremental-empire/templates/upgrades",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"dKck9vrJ",block:'{"symbols":["upgrade"],"statements":[[7,"div"],[11,"class","row mx-2 my-2"],[9],[0,"\\n"],[4,"each",[[25,["displayedUpgrades"]]],null,{"statements":[[0,"    "],[7,"div"],[11,"class","col-sm-3"],[9],[0,"\\n      "],[7,"div"],[11,"class","card"],[9],[0,"\\n        "],[7,"div"],[11,"class","card-header"],[9],[0,"\\n          "],[1,[24,1,["name"]],false],[0,"\\n        "],[10],[0,"\\n        "],[7,"div"],[11,"class","card-body"],[9],[0,"\\n          "],[7,"p"],[11,"class","card-text"],[9],[1,[24,1,["description"]],false],[10],[0,"\\n          "],[7,"button"],[11,"class","btn btn-primary"],[12,"disabled",[24,1,["cannotBuy"]]],[12,"onclick",[29,"action",[[24,0,[]],"buy",[24,1,[]]],null]],[11,"type","button"],[9],[0,"\\n            Buy for\\n"],[4,"if",[[24,1,["manaCost"]]],null,{"statements":[[0,"              "],[5,"fa-icon",[],[["@icon"],["dot-circle"]]],[0," "],[1,[24,1,["manaCost"]],false],[0,"\\n"]],"parameters":[]},null],[4,"if",[[24,1,["cultureCost"]]],null,{"statements":[[0,"              "],[5,"fa-icon",[],[["@icon"],["book"]]],[0," "],[1,[24,1,["cultureCost"]],false],[0,"\\n"]],"parameters":[]},null],[4,"if",[[24,1,["moneyCost"]]],null,{"statements":[[0,"              "],[5,"fa-icon",[],[["@icon"],["coins"]]],[0," "],[1,[24,1,["moneyCost"]],false],[0,"\\n"]],"parameters":[]},null],[4,"if",[[24,1,["scienceCost"]]],null,{"statements":[[0,"              "],[5,"fa-icon",[],[["@icon"],["flask"]]],[0," "],[1,[24,1,["scienceCost"]],false],[0,"\\n"]],"parameters":[]},null],[0,"          "],[10],[0,"\\n        "],[10],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n"]],"parameters":[1]},null],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/upgrades.hbs"}})
e.default=t}),define("incremental-empire/config/environment",[],function(){try{var e="incremental-empire/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(r){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("incremental-empire/app").default.create({name:"incremental-empire",version:"0.0.0+fd4e145b"})
