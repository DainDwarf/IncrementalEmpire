"use strict"
define("incremental-empire/adapters/application",["exports","ember-local-storage/adapters/local"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/app",["exports","incremental-empire/resolver","ember-load-initializers","incremental-empire/config/environment"],function(e,t,n,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:t.default});(0,n.default)(a,r.default.modulePrefix)
var i=a
e.default=i}),define("incremental-empire/components/ember-notify",["exports","ember-notify/components/ember-notify"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("incremental-empire/components/ember-notify/message",["exports","ember-notify/components/ember-notify/message"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("incremental-empire/components/fa-icon",["exports","@fortawesome/ember-fontawesome/components/fa-icon"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/controllers/achievements",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({displayedAchievements:Ember.computed("model.@each.{isActive,isHidden}",function(){return this.model.filter(function(e){return e.isActive||!e.isHidden})})})
e.default=t}),define("incremental-empire/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({isManaHidden:Ember.computed.not("model.manaUnlocked"),isCultureHidden:Ember.computed.not("model.cultureUnlocked"),isMoneyHidden:Ember.computed.not("model.moneyUnlocked"),isScienceHidden:Ember.computed.not("model.scienceUnlocked")})
e.default=t}),define("incremental-empire/controllers/empire",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({spellPointsDisplayed:Ember.computed.gt("model.maxSpellPoints",0),actions:{nextTurn:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,this.game.empire.nextTurn()
case 3:return e.next=5,this.game.checkAchievements()
case 5:if(0!=this.model.population){e.next=14
break}return $("#empireLostModal").modal(),e.next=9,this.store.createRecord("empire")
case 9:return n=e.sent,this.set("model",n),e.next=13,this.game.rebirth(n)
case 13:this.transitionToRoute("empire")
case 14:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/empire/food",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({isGenFoodOnCooldown:Ember.computed.lt("model.spellPoints",1),actions:{genFood:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=1,this.game.upgrades.get("Click Power").isActive&&this.game.universe.mana>0&&(n=this.game.universe.mana),this.model.set("food",this.model.food+n),this.model.set("spellPoints",this.model.spellPoints-1),e.next=7,this.model.save()
case 7:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/empire/population",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({genPopUpgrade:Ember.computed("this.game.upgrades",function(){return this.game.upgrades.get("Spontaneous Generation")}),isGenPopulationUnavailable:Ember.computed.not("genPopUpgrade.isActive"),isGenPopulationOnCooldown:Ember.computed.lt("model.spellPoints",5),actions:{genPopulation:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),this.model.set("population",this.model.population+1),this.model.set("spellPoints",this.model.spellPoints-5),e.next=5,this.model.save()
case 5:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
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
e.default=n}),define("incremental-empire/controllers/templates",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}function n(e){return function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Controller.extend({canAddTemplate:Ember.computed.lt("model.length",3),actions:{newTemplate:function(){var e=n(regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,this.store.createRecord("template")
case 3:return n=e.sent,this.game.templates.pushObject(n),e.next=7,n.save()
case 7:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),deleteTemplate:function(){var e=n(regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findRecord("template",t,{backgroundReload:!1})
case 2:if(n=e.sent,!window.confirm("Are you sure? This will delete template "+n.name)){e.next=11
break}return e.next=7,n.destroyRecord()
case 7:return e.next=9,this.game.loadTemplates()
case 9:this.set("model",this.game.templates),this.transitionToRoute("templates")
case 11:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}()}})
e.default=r}),define("incremental-empire/controllers/templates/template",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}function n(e){return function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Controller.extend({achievementsModel:Ember.computed("game.achievements",function(){var e=Ember.A(),t=!0,n=!1,r=void 0
try{for(var a,i=this.game.achievements.values()[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var o=a.value
e.pushObject(o)}}catch(s){n=!0,r=s}finally{try{t||null==i.return||i.return()}finally{if(n)throw r}}return e}),activeAchievements:Ember.computed.filterBy("achievementsModel","isActive",!0),templatePointsArray:Ember.computed.mapBy("activeAchievements","templatePoint"),templatePoints:Ember.computed.sum("templatePointsArray"),remainingTemplatePoints:Ember.computed("templatePoints","model.{popTP,foodTP}",function(){return this.templatePoints-(this.model.popTP+this.model.foodTP)}),rebirthPop:Ember.computed("model.popTP",function(){var e=1
return this.game.achievements.get("Have 5 population").isActive&&(e*=4),1+this.model.popTP*e}),rebirthFood:Ember.computed("model.foodTP",function(){return 10*this.model.foodTP}),actions:{updateTemplateName:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.model.set("name",t),e.next=3,this.model.save()
case 3:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),lessPop:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!(this.model.popTP>0)){e.next=5
break}return this.model.set("popTP",this.model.popTP-1),e.next=5,this.model.save()
case 5:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),morePop:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!(this.remainingTemplatePoints>0)){e.next=5
break}return this.model.set("popTP",this.model.popTP+1),e.next=5,this.model.save()
case 5:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),lessFood:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!(this.model.foodTP>0)){e.next=5
break}return this.model.set("foodTP",this.model.foodTP-1),e.next=5,this.model.save()
case 5:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),moreFood:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!(this.remainingTemplatePoints>0)){e.next=5
break}return this.model.set("foodTP",this.model.foodTP+1),e.next=5,this.model.save()
case 5:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),rebirth:function(){var e=n(regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,this.store.createRecord("empire",{name:this.model.name,population:this.rebirthPop,food:this.rebirthFood})
case 3:return n=e.sent,e.next=6,this.game.rebirth(n)
case 6:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}()}})
e.default=r}),define("incremental-empire/controllers/upgrades",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
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
e.default=n}),define("incremental-empire/models/achievement",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model,r=t.default.attr,a=n.extend({name:r("string",{defaultValue:""}),isActive:r("boolean",{defaultValue:!1}),isHidden:r("boolean",{defaultValue:!1}),templatePoint:0,description:"",condition:void 0})
e.default=a}),define("incremental-empire/models/empire",["exports","ember-data"],function(e,t){function n(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default.Model,a=t.default.attr,i=r.extend({name:a("string",{defaultValue:"Empire"}),turn:a("number",{defaultValue:0}),population:a("number",{defaultValue:1}),food:a("number",{defaultValue:0}),material:a("number",{defaultValue:0}),metal:a("number",{defaultValue:0}),energy:a("number",{defaultValue:0}),spellPoints:a("number",{defaultValue:5}),maxSpellPoints:a("number",{defaultValue:5}),nextManaPoints:Ember.computed("population","turn",function(){var e=this.population,t=this.turn
return e>1&&t>20?Math.max(0,Math.floor(Math.sqrt((e-1)*(t/10-1)))):0}),nextTurn:function(){var e,t=(e=regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.food>=this.population?this.set("food",this.food-this.population):(this.set("population",this.food),this.set("food",0)),this.set("turn",this.turn+1),this.set("spellPoints",this.maxSpellPoints),e.next=5,this.save()
case 5:case"end":return e.stop()}},e,this)}),function(){var t=this,r=arguments
return new Promise(function(a,i){var o=e.apply(t,r)
function s(e){n(o,a,i,s,l,"next",e)}function l(e){n(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(){return t.apply(this,arguments)}}()})
e.default=i}),define("incremental-empire/models/template",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model,r=t.default.attr,a=n.extend({name:r("string",{defaultValue:"Empire"}),popTP:r("number",{defaultValue:0}),foodTP:r("number",{defaultValue:0})})
e.default=a}),define("incremental-empire/models/universe",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model,r=t.default.attr,a=n.extend({name:r("string",{defaultValue:"Incremental Empire"}),mana:r("number",{defaultValue:0}),culture:r("number",{defaultValue:0}),money:r("number",{defaultValue:0}),science:r("number",{defaultValue:0}),manaUnlocked:r("boolean",{defaultValue:!1}),cultureUnlocked:r("boolean",{defaultValue:!1}),moneyUnlocked:r("boolean",{defaultValue:!1}),scienceUnlocked:r("boolean",{defaultValue:!1})})
e.default=a}),define("incremental-empire/models/upgrade",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model,r=t.default.attr,a=n.extend({name:r("string",{defaultValue:""}),isActive:r("boolean",{defaultValue:!1}),description:"",manaCost:0,cultureCost:0,moneyCost:0,scienceCost:0,globalCost:Ember.computed("manaCost","cultureCost","moneyCost","scienceCost",function(){return this.manaCost+this.cultureCost+this.moneyCost+this.scienceCost}),cannotBuy:Ember.computed("game.universe.{mana,culture,money,science}","manaCost","cultureCost","moneyCost","scienceCost",function(){return this.manaCost>this.game.universe.mana||this.cultureCost>this.game.universe.culture||this.moneyCost>this.game.universe.money||this.scienceCost>this.game.universe.science})})
e.default=a}),define("incremental-empire/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n})
define("incremental-empire/router",["exports","incremental-empire/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){this.route("empire",function(){this.route("population"),this.route("food"),this.route("material"),this.route("metal"),this.route("energy")}),this.route("upgrades"),this.route("templates",function(){this.route("template",{path:":id"})}),this.route("achievements"),this.route("settings")})
var r=n
e.default=r}),define("incremental-empire/routes/achievements",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({achievementsModel:Ember.computed("this.game.achievements",function(){var e=Ember.A(),t=!0,n=!1,r=void 0
try{for(var a,i=this.game.achievements.values()[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var o=a.value
e.pushObject(o)}}catch(s){n=!0,r=s}finally{try{t||null==i.return||i.return()}finally{if(n)throw r}}return e}),model:function(){return this.achievementsModel}})
e.default=t}),define("incremental-empire/routes/application",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Route.extend({model:function(){var e,n=(e=regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.game.load()
case 2:return e.abrupt("return",this.game.universe)
case 3:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(){return n.apply(this,arguments)}}()})
e.default=n}),define("incremental-empire/routes/empire",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(){return this.game.empire}})
e.default=t}),define("incremental-empire/routes/empire/energy",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/empire/food",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/empire/material",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/empire/metal",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/empire/population",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/settings",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/templates",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(){return this.game.templates}})
e.default=t}),define("incremental-empire/routes/templates/template",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(e){return this.store.findRecord("template",e.id)}})
e.default=t}),define("incremental-empire/routes/upgrades",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({upgradesModel:Ember.computed("this.game.upgrades",function(){var e=Ember.A(),t=!0,n=!1,r=void 0
try{for(var a,i=this.game.upgrades.values()[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var o=a.value
e.pushObject(o)}}catch(s){n=!0,r=s}finally{try{t||null==i.return||i.return()}finally{if(n)throw r}}return e}),model:function(){return this.upgradesModel}})
e.default=t}),define("incremental-empire/serializers/application",["exports","ember-local-storage/serializers/serializer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/services/game-template",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Service.extend({store:Ember.inject.service("store"),universe:void 0,empire:void 0,upgrades:void 0,achievements:void 0,generate:function(){var e,n=(e=regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.createRecord("universe")
case 2:return this.universe=e.sent,e.next=5,this.store.createRecord("empire")
case 5:return this.empire=e.sent,e.next=8,this.store.createRecord("upgrade",{name:"Spontaneous Generation",manaCost:1,description:"You can now create more humans"})
case 8:return e.t0=e.sent,e.next=11,this.store.createRecord("upgrade",{name:"Click Power",manaCost:5,description:"Your god powers for generating ressources is multiplied by your current mana"})
case 11:return e.t1=e.sent,this.upgrades=[e.t0,e.t1],this.achievements=[],e.next=16,this.store.createRecord("achievement",{name:"Eden is Working!",templatePoint:1,description:"Time to create Eve"})
case 16:return(t=e.sent).reopen({condition:Ember.computed.gte("game.empire.turn",10)}),this.achievements.push(t),e.next=21,this.store.createRecord("achievement",{name:"Have 5 population",templatePoint:1,description:"Template Point gives 4x more population"})
case 21:return(t=e.sent).reopen({condition:Ember.computed.gte("game.empire.population",5)}),this.achievements.push(t),e.next=26,this.store.createRecord("achievement",{isHidden:!0,name:"Lose an empire",templatePoint:1,description:"You let all the population die, you monster!"})
case 26:(t=e.sent).reopen({condition:Ember.computed.equal("game.empire.population",0)}),this.achievements.push(t)
case 29:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(){return n.apply(this,arguments)}}()})
e.default=n}),define("incremental-empire/services/game",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}function n(e){return function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Service.extend({store:Ember.inject.service(),notify:Ember.inject.service(),gameTemplate:Ember.inject.service("game-template"),universe:void 0,empire:void 0,upgrades:void 0,achievements:void 0,templates:void 0,load:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.loadUniverse()
case 2:return e.next=4,this.loadEmpire()
case 4:return e.next=6,this.loadUpgrades()
case 6:return e.next=8,this.loadAchievements()
case 8:return e.next=10,this.loadTemplates()
case 10:return e.next=12,this.consolidateSave()
case 12:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),loadUniverse:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("universe").then(function(e){return e.get("firstObject")})
case 2:this.universe=e.sent
case 3:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),loadEmpire:function(){var e=n(regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("empire")
case 2:t=e.sent,this.empire=t.get("firstObject")
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),loadUpgrades:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("upgrade").then(function(e){var t=new Map
return e.forEach(function(e){return t.set(e.name,e)}),t})
case 2:this.upgrades=e.sent
case 3:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),loadAchievements:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("achievement").then(function(e){var t=new Map
return e.forEach(function(e){return t.set(e.name,e)}),t})
case 2:this.achievements=e.sent
case 3:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),loadTemplates:function(){var e=n(regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("template")
case 2:t=e.sent,this.templates=t.toArray()
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),consolidateSave:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.gameTemplate.generate()
case 2:return e.next=4,this.consolidateUniverse()
case 4:return e.next=6,this.consolidateEmpire()
case 6:return e.next=8,this.consolidateUpgrades()
case 8:return e.next=10,this.consolidateAchievements()
case 10:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),consolidateUniverse:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=this.universe){e.next=4
break}return this.universe=this.gameTemplate.universe,e.next=4,this.universe.save()
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),consolidateEmpire:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=this.empire){e.next=4
break}return this.empire=this.gameTemplate.empire,e.next=4,this.empire.save()
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),consolidateUpgrades:function(){var e=n(regeneratorRuntime.mark(function e(){var t,n,r
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=0
case 1:if(!(t<this.gameTemplate.upgrades.length)){e.next=18
break}if(n=this.gameTemplate.upgrades[t],null!=(r=this.upgrades.get(n.name))){e.next=10
break}return this.upgrades.set(n.name,n),e.next=8,n.save()
case 8:e.next=15
break
case 10:r.set("manaCost",n.manaCost),r.set("cultureCost",n.cultureCost),r.set("moneyCost",n.moneyCost),r.set("scienceCost",n.scienceCost),r.set("description",n.description)
case 15:t++,e.next=1
break
case 18:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),consolidateAchievements:function(){var e=n(regeneratorRuntime.mark(function e(){var t,n,r
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=0
case 1:if(!(t<this.gameTemplate.achievements.length)){e.next=16
break}if(n=this.gameTemplate.achievements[t],null!=(r=this.achievements.get(n.name))){e.next=10
break}return this.achievements.set(n.name,n),e.next=8,n.save()
case 8:e.next=13
break
case 10:r.set("templatePoint",n.templatePoint),r.set("description",n.description),r.reopen({condition:n.condition})
case 13:t++,e.next=1
break
case 16:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),rebirth:function(){var e=n(regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.empire.nextManaPoints,this.empire.destroyRecord(),this.set("empire",t),e.next=5,this.empire.save()
case 5:return this.universe.set("mana",this.universe.mana+n),this.universe.mana>0&&!this.universe.manaUnlocked&&this.universe.set("manaUnlocked",!0),e.next=9,this.universe.save()
case 9:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),buyUpgrade:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.cannotBuy||t.isActive){e.next=10
break}return t.set("isActive",!0),e.next=4,t.save()
case 4:return t.manaCost>0&&this.universe.set("mana",this.universe.mana-t.manaCost),t.cultureCost>0&&this.universe.set("culture",this.universe.culture-t.cultureCost),t.moneyCost>0&&this.universe.set("money",this.universe.money-t.moneyCost),t.scienceCost>0&&this.universe.set("science",this.universe.science-t.scienceCost),e.next=10,this.universe.save()
case 10:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),checkAchievements:function(){var e=n(regeneratorRuntime.mark(function e(){var t,n,r,a,i,o
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=!0,n=!1,r=void 0,e.prev=3,a=this.achievements.values()[Symbol.iterator]()
case 5:if(t=(i=a.next()).done){e.next=15
break}if((o=i.value).isActive||!o.condition){e.next=12
break}return o.set("isActive",!0),this.notify.success(o.name,{radius:!0}),e.next=12,o.save()
case 12:t=!0,e.next=5
break
case 15:e.next=21
break
case 17:e.prev=17,e.t0=e.catch(3),n=!0,r=e.t0
case 21:e.prev=21,e.prev=22,t||null==a.return||a.return()
case 24:if(e.prev=24,!n){e.next=27
break}throw r
case 27:return e.finish(24)
case 28:return e.finish(21)
case 29:case"end":return e.stop()}},e,this,[[3,17,21,29],[22,,24,28]])}))
return function(){return e.apply(this,arguments)}}()})
e.default=r}),define("incremental-empire/services/notify",["exports","ember-notify"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("incremental-empire/templates/achievements",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"oxNw2t/I",block:'{"symbols":["achievement"],"statements":[[7,"div"],[11,"class","row mx-2 my-2"],[9],[0,"\\n"],[4,"each",[[25,["displayedAchievements"]]],null,{"statements":[[0,"    "],[7,"div"],[11,"class","col-sm-3"],[9],[0,"\\n      "],[7,"div"],[12,"class",[30,["card ",[29,"unless",[[24,1,["isActive"]],"text-muted"],null]]]],[9],[0,"\\n        "],[7,"div"],[12,"class",[30,["card-header ",[29,"if",[[24,1,["isActive"]],"bg-success"],null]]]],[9],[0,"\\n          "],[1,[24,1,["name"]],false],[0,"\\n        "],[10],[0,"\\n        "],[7,"div"],[11,"class","card-body"],[9],[0,"\\n          "],[7,"p"],[11,"class","card-text"],[9],[1,[24,1,["description"]],false],[10],[0,"\\n        "],[10],[0,"\\n"],[4,"if",[[24,1,["templatePoint"]]],null,{"statements":[[0,"          "],[7,"footer"],[11,"class","mx-1 text-right"],[9],[0,"\\n            "],[7,"small"],[9],[0,"\\n              Reward: "],[1,[24,1,["templatePoint"]],false],[0," Template Point\\n            "],[10],[0,"\\n          "],[10],[0,"\\n"]],"parameters":[]},null],[0,"      "],[10],[0,"\\n    "],[10],[0,"\\n"]],"parameters":[1]},null],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/achievements.hbs"}})
e.default=t}),define("incremental-empire/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"cQzIdJzK",block:'{"symbols":["message"],"statements":[[4,"ember-notify",null,[["messageStyle"],["bootstrap"]],{"statements":[[4,"link-to",null,[["route"],["achievements"]],{"statements":[[0,"    "],[1,[24,1,["text"]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[1]},null],[7,"div"],[11,"class","modal fade"],[11,"id","empireLostModal"],[11,"tabindex","-1"],[11,"role","dialog"],[9],[0,"\\n  "],[7,"div"],[11,"class","modal-dialog"],[11,"role","document"],[9],[0,"\\n    "],[7,"div"],[11,"class","modal-content"],[9],[0,"\\n      "],[7,"div"],[11,"class","modal-header"],[9],[0,"\\n        "],[7,"h5"],[11,"class","modal-title"],[9],[1,[25,["game","empire","name"]],false],[0," final years"],[10],[0,"\\n      "],[10],[0,"\\n      "],[7,"div"],[11,"class","modal-body"],[9],[0,"\\n        "],[1,[25,["game","empire","name"]],false],[0," has lost all its people/ You will need to start over with a new empire, and be careful next time.\\n      "],[10],[0,"\\n      "],[7,"div"],[11,"class","modal-footer"],[9],[0,"\\n        "],[7,"button"],[11,"class","btn btn-secondary"],[11,"data-dismiss","modal"],[11,"type","button"],[9],[0,"Close"],[10],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[7,"nav"],[11,"class","navbar navbar-expand-lg navbar-light bg-light"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["navbar-brand mr-auto","index"]],{"statements":[[0,"    "],[1,[25,["model","name"]],false],[0,"\\n"]],"parameters":[]},null],[0,"  "],[7,"ul"],[11,"class","navbar-nav"],[9],[0,"\\n    "],[7,"li"],[11,"class","nav-item mx-2"],[12,"hidden",[23,"isManaHidden"]],[9],[5,"fa-icon",[],[["@icon"],["dot-circle"]]],[0," "],[1,[25,["model","mana"]],false],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item mx-2"],[12,"hidden",[23,"isCultureHidden"]],[9],[5,"fa-icon",[],[["@icon"],["book"]]],[0," "],[1,[25,["model","culture"]],false],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item mx-2"],[12,"hidden",[23,"isMoneyHidden"]],[9],[5,"fa-icon",[],[["@icon"],["coins"]]],[0," "],[1,[25,["model","money"]],false],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item mx-2"],[12,"hidden",[23,"isScienceHidden"]],[9],[5,"fa-icon",[],[["@icon"],["flask"]]],[0," "],[1,[25,["model","science"]],false],[10],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"ul"],[11,"class","nav nav-tabs"],[9],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","empire"]],{"statements":[[0,"        "],[1,[24,0,["game","empire","name"]],false],[0,"\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","templates"]],{"statements":[[0,"        Templates\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","upgrades"]],{"statements":[[0,"        Upgrades\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","achievements"]],{"statements":[[0,"        Achievements\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item ml-auto"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","settings"]],{"statements":[[0,"        Settings\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/application.hbs"}})
e.default=t}),define("incremental-empire/templates/empire",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"gMrTnT6u",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"div"],[11,"class","row"],[9],[0,"\\n    "],[7,"nav"],[11,"class","nav nav-pills flex-column border-right w-15"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","empire.population"]],{"statements":[[0,"        Population "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","population"]],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","empire.food"]],{"statements":[[0,"        Food "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","food"]],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","empire.material"]],{"statements":[[0,"        Material "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","material"]],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","empire.metal"]],{"statements":[[0,"        Metal "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","metal"]],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","empire.energy"]],{"statements":[[0,"        Energy "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","energy"]],false],[10],[0,"\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"div"],[11,"class","w-85"],[9],[0,"\\n      "],[7,"nav"],[11,"class","navbar navbar-expand-lg navbar-light bg-light"],[9],[0,"\\n        "],[7,"ul"],[11,"class","navbar-nav mr-auto"],[9],[0,"\\n          "],[7,"li"],[11,"class","nav-item mx-2"],[9],[5,"fa-icon",[],[["@icon"],["users"]]],[0," "],[1,[25,["model","population"]],false],[10],[0,"\\n          "],[7,"li"],[11,"class","nav-item mx-2"],[9],[5,"fa-icon",[],[["@icon"],["smile"]]],[0," 67%"],[10],[0,"\\n"],[4,"if",[[25,["spellPointsDisplayed"]]],null,{"statements":[[0,"            "],[5,"fa-icon",[],[["@icon"],["magic"]]],[0," "],[1,[25,["model","spellPoints"]],false],[0,"/"],[1,[25,["model","maxSpellPoints"]],false],[0,"\\n"]],"parameters":[]},null],[0,"        "],[10],[0,"\\n        "],[7,"button"],[11,"class","btn btn-secondary"],[12,"onclick",[29,"action",[[24,0,[]],"nextTurn"],null]],[11,"type","button"],[9],[0,"Turn "],[1,[25,["model","turn"]],false],[10],[0,"\\n      "],[10],[0,"\\n      "],[7,"div"],[11,"class","container"],[9],[0,"\\n        "],[1,[23,"outlet"],false],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/energy",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"FNPaZTru",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/energy.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/food",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"ogs+mnEG",block:'{"symbols":[],"statements":[[7,"button"],[11,"class","btn btn-outline-success"],[12,"disabled",[23,"isGenFoodOnCooldown"]],[12,"onclick",[29,"action",[[24,0,[]],"genFood"],null]],[11,"type","button"],[9],[0,"\\n  Horn of Plenty "],[7,"small"],[9],[5,"fa-icon",[],[["@icon"],["magic"]]],[0," 1"],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/food.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/material",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"R2rIHb+Z",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/material.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/metal",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"n14kJA+U",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/metal.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/population",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"YaE6bAEf",block:'{"symbols":[],"statements":[[7,"button"],[11,"class","btn btn-outline-success"],[12,"hidden",[23,"isGenPopulationUnavailable"]],[12,"disabled",[23,"isGenPopulationOnCooldown"]],[12,"onclick",[29,"action",[[24,0,[]],"genPopulation"],null]],[11,"type","button"],[9],[0,"\\n  Spontaneous Generation "],[7,"small"],[9],[5,"fa-icon",[],[["@icon"],["magic"]]],[0," 5"],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/population.hbs"}})
e.default=t}),define("incremental-empire/templates/settings",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"3pjgThAK",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"button"],[11,"class","btn btn-outline-danger my-2 mx-auto"],[12,"onclick",[29,"action",[[24,0,[]],"destroyEverything"],null]],[11,"type","button"],[9],[0,"Clear save data"],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/settings.hbs"}})
e.default=t}),define("incremental-empire/templates/templates",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"VszbNJQU",block:'{"symbols":["template"],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"div"],[11,"class","row"],[9],[0,"\\n    "],[7,"nav"],[11,"class","ml-2 nav nav-pills flex-column border-right w-15"],[9],[0,"\\n"],[4,"each",[[25,["model"]]],null,{"statements":[[0,"        "],[7,"div"],[11,"class","row"],[9],[0,"\\n          "],[7,"div"],[11,"class","col"],[9],[0,"\\n"],[4,"link-to",null,[["class","route","model"],["nav-link","templates.template",[24,1,["id"]]]],{"statements":[[0,"              "],[1,[24,1,["name"]],false],[0,"\\n"]],"parameters":[]},null],[0,"          "],[10],[0,"\\n          "],[7,"div"],[11,"class","col mr-1"],[9],[0,"\\n            "],[7,"button"],[11,"class","close"],[12,"onclick",[29,"action",[[24,0,[]],"deleteTemplate",[24,1,["id"]]],null]],[11,"type","button"],[9],[0,"×"],[10],[0,"\\n          "],[10],[0,"\\n        "],[10],[0,"\\n"]],"parameters":[1]},null],[4,"if",[[25,["canAddTemplate"]]],null,{"statements":[[0,"        "],[7,"button"],[11,"typ","button"],[11,"class","btn"],[12,"onclick",[29,"action",[[24,0,[]],"newTemplate"],null]],[9],[0,"Add new template"],[10],[0,"\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"div"],[11,"class","border w-80"],[9],[0,"\\n      "],[1,[23,"outlet"],false],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/templates.hbs"}})
e.default=t}),define("incremental-empire/templates/templates/template",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"fNeZh0gp",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid bg-light"],[9],[0,"\\n  "],[5,"input",[[13,"value",[25,["model","name"]]]],[["@focus-out"],[[29,"action",[[24,0,[]],"updateTemplateName"],null]]]],[0,"\\n  "],[7,"span"],[11,"class","float-right"],[9],[0,"You have "],[1,[23,"remainingTemplatePoints"],false],[0,"/"],[1,[23,"templatePoints"],false],[0," template points"],[10],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"class","container"],[9],[0,"\\n  "],[1,[29,"fa-icon",["minus-circle"],[["class","click"],["click-icon",[29,"action",[[24,0,[]],"lessPop"],null]]]],false],[0,"\\n  Population: "],[1,[23,"rebirthPop"],false],[0,"\\n  "],[1,[29,"fa-icon",["plus-circle"],[["class","click"],["click-icon",[29,"action",[[24,0,[]],"morePop"],null]]]],false],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"class","container"],[9],[0,"\\n  "],[1,[29,"fa-icon",["minus-circle"],[["class","click"],["click-icon",[29,"action",[[24,0,[]],"lessFood"],null]]]],false],[0,"\\n  Food: "],[1,[23,"rebirthFood"],false],[0,"\\n  "],[1,[29,"fa-icon",["plus-circle"],[["class","click"],["click-icon",[29,"action",[[24,0,[]],"moreFood"],null]]]],false],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"class","container"],[9],[0,"\\n  "],[7,"button"],[11,"class","btn btn-outline-danger my-2"],[12,"onclick",[29,"action",[[24,0,[]],"rebirth"],null]],[11,"type","button"],[9],[0,"\\n    Restart with this empire and gain "],[5,"fa-icon",[],[["@icon"],["dot-circle"]]],[0," "],[1,[25,["game","empire","nextManaPoints"]],false],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"class","container small"],[9],[0,"\\nReligious empires produces more "],[5,"fa-icon",[],[["@icon"],["dot-circle"]]],[0," if you have more population and spend more turns. You need at least 2 population and 21 turns to start producing "],[5,"fa-icon",[],[["@icon"],["dot-circle"]]],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/templates/template.hbs"}})
e.default=t}),define("incremental-empire/templates/upgrades",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"dKck9vrJ",block:'{"symbols":["upgrade"],"statements":[[7,"div"],[11,"class","row mx-2 my-2"],[9],[0,"\\n"],[4,"each",[[25,["displayedUpgrades"]]],null,{"statements":[[0,"    "],[7,"div"],[11,"class","col-sm-3"],[9],[0,"\\n      "],[7,"div"],[11,"class","card"],[9],[0,"\\n        "],[7,"div"],[11,"class","card-header"],[9],[0,"\\n          "],[1,[24,1,["name"]],false],[0,"\\n        "],[10],[0,"\\n        "],[7,"div"],[11,"class","card-body"],[9],[0,"\\n          "],[7,"p"],[11,"class","card-text"],[9],[1,[24,1,["description"]],false],[10],[0,"\\n          "],[7,"button"],[11,"class","btn btn-primary"],[12,"disabled",[24,1,["cannotBuy"]]],[12,"onclick",[29,"action",[[24,0,[]],"buy",[24,1,[]]],null]],[11,"type","button"],[9],[0,"\\n            Buy for\\n"],[4,"if",[[24,1,["manaCost"]]],null,{"statements":[[0,"              "],[5,"fa-icon",[],[["@icon"],["dot-circle"]]],[0," "],[1,[24,1,["manaCost"]],false],[0,"\\n"]],"parameters":[]},null],[4,"if",[[24,1,["cultureCost"]]],null,{"statements":[[0,"              "],[5,"fa-icon",[],[["@icon"],["book"]]],[0," "],[1,[24,1,["cultureCost"]],false],[0,"\\n"]],"parameters":[]},null],[4,"if",[[24,1,["moneyCost"]]],null,{"statements":[[0,"              "],[5,"fa-icon",[],[["@icon"],["coins"]]],[0," "],[1,[24,1,["moneyCost"]],false],[0,"\\n"]],"parameters":[]},null],[4,"if",[[24,1,["scienceCost"]]],null,{"statements":[[0,"              "],[5,"fa-icon",[],[["@icon"],["flask"]]],[0," "],[1,[24,1,["scienceCost"]],false],[0,"\\n"]],"parameters":[]},null],[0,"          "],[10],[0,"\\n        "],[10],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n"]],"parameters":[1]},null],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/upgrades.hbs"}})
e.default=t})
define("incremental-empire/config/environment",[],function(){try{var e="incremental-empire/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(r){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("incremental-empire/app").default.create({name:"incremental-empire",version:"0.0.0+43faf199"})
