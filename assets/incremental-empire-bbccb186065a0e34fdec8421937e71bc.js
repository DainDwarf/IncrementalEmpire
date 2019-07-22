"use strict"
define("incremental-empire/adapters/application",["exports","ember-local-storage/adapters/local"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/app",["exports","incremental-empire/resolver","ember-load-initializers","incremental-empire/config/environment"],function(e,t,n,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:t.default});(0,n.default)(a,r.default.modulePrefix)
var i=a
e.default=i}),define("incremental-empire/components/fa-icon",["exports","@fortawesome/ember-fontawesome/components/fa-icon"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/controllers/universe",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var l=e[i](o),s=l.value}catch(u){return void n(u)}l.done?t(s):Promise.resolve(s).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({isManaHidden:Ember.computed.equal("model.mana",0),isCultureHidden:Ember.computed.equal("model.culture",0),isMoneyHidden:Ember.computed.equal("model.money",0),isScienceHidden:Ember.computed.equal("model.science",0),actions:{nextTurn:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){var n,r,a
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,this.model.get("mainEmpire")
case 3:return n=e.sent,e.next=6,n.get("population")
case 6:return r=e.sent,e.next=9,n.get("food")
case 9:return(a=e.sent)>=r?n.set("food",a-r):(n.set("food",0),n.set("population",a)),n.set("turn",n.get("turn")+1),e.next=14,n.save()
case 14:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function l(e){t(o,a,i,l,s,"next",e)}function s(e){t(o,a,i,l,s,"throw",e)}l(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/universe/empire/population",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var l=e[i](o),s=l.value}catch(u){return void n(u)}l.done?t(s):Promise.resolve(s).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({actions:{popGeneration:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),this.model.set("population",this.model.get("population")+1),e.next=4,this.model.save()
case 4:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function l(e){t(o,a,i,l,s,"next",e)}function s(e){t(o,a,i,l,s,"throw",e)}l(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/universe/empire/ressources/food",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var l=e[i](o),s=l.value}catch(u){return void n(u)}l.done?t(s):Promise.resolve(s).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({actions:{popFood:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),this.model.set("food",this.model.get("food")+1),e.next=4,this.model.save()
case 4:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function l(e){t(o,a,i,l,s,"next",e)}function s(e){t(o,a,i,l,s,"throw",e)}l(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/universe/settings",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var l=e[i](o),s=l.value}catch(u){return void n(u)}l.done?t(s):Promise.resolve(s).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({actions:{destroyEverything:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),window.confirm("Are you sure? This will lose all your game progress and cannot be recovered in any way.")&&(window.localStorage.clear(),this.transitionToRoute("index"))
case 3:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function l(e){t(o,a,i,l,s,"next",e)}function s(e){t(o,a,i,l,s,"throw",e)}l(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/universe/templates",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var l=e[i](o),s=l.value}catch(u){return void n(u)}l.done?t(s):Promise.resolve(s).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({actions:{rebirth:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){var n,r,a
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,this.model.get("mainEmpire")
case 3:return n=e.sent,r=n.population,n.destroyRecord(),e.next=8,this.store.createRecord("empire")
case 8:return a=e.sent,e.next=11,a.save()
case 11:return this.model.set("mainEmpire",a),this.model.set("mana",this.model.get("mana")+r),e.next=15,this.model.save()
case 15:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function l(e){t(o,a,i,l,s,"next",e)}function s(e){t(o,a,i,l,s,"throw",e)}l(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/helpers/app-version",["exports","incremental-empire/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n){function r(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.default.APP.version,i=r.versionOnly||r.hideSha,o=r.shaOnly||r.hideVersion,l=null
return i&&(r.showExtended&&(l=a.match(n.versionExtendedRegExp)),l||(l=a.match(n.versionRegExp))),o&&(l=a.match(n.shaRegExp)),l?l[0]:a}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=r,e.default=void 0
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
e.default=r}),define("incremental-empire/initializers/local-storage-adapter",["exports","ember-local-storage/initializers/local-storage-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"initialize",{enumerable:!0,get:function(){return t.initialize}})}),define("incremental-empire/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:t.default}
e.default=n}),define("incremental-empire/models/empire",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model,r=t.default.attr,a=t.default.belongsTo,i=n.extend({universe:a("universe",{async:!0,autoSave:!0}),turn:r("number",{defaultValue:0}),population:r("number",{defaultValue:1}),food:r("number",{defaultValue:0})})
e.default=i}),define("incremental-empire/models/universe",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model,r=t.default.attr,a=t.default.belongsTo,i=n.extend({name:r("string",{defaultValue:"Incremental Empire"}),mainEmpire:a("empire",{async:!0,autoSave:!0}),mana:r("number",{defaultValue:0}),culture:r("number",{defaultValue:0}),money:r("number",{defaultValue:0}),science:r("number",{defaultValue:0})})
e.default=i}),define("incremental-empire/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("incremental-empire/router",["exports","incremental-empire/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){this.route("universe",function(){this.route("empire",function(){this.route("population"),this.route("ressources",function(){this.route("food"),this.route("wood"),this.route("stone"),this.route("metal"),this.route("energy")})}),this.route("upgrades"),this.route("templates"),this.route("achievements"),this.route("settings")})})
var r=n
e.default=r}),define("incremental-empire/routes/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({beforeModel:function(){this.transitionTo("universe")}})
e.default=t}),define("incremental-empire/routes/universe",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var l=e[i](o),s=l.value}catch(u){return void n(u)}l.done?t(s):Promise.resolve(s).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Route.extend({model:function(){var e,n=(e=regeneratorRuntime.mark(function e(){var t,n,r
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("universe")
case 2:if(0!=(t=e.sent).length){e.next=17
break}return e.next=6,this.store.createRecord("empire")
case 6:return n=e.sent,e.next=9,n.save()
case 9:return e.next=11,this.store.createRecord("universe",{mainEmpire:n})
case 11:return r=e.sent,e.next=14,r.save()
case 14:return e.abrupt("return",r)
case 17:return e.abrupt("return",t.get("firstObject"))
case 18:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function l(e){t(o,a,i,l,s,"next",e)}function s(e){t(o,a,i,l,s,"throw",e)}l(void 0)})})
return function(){return n.apply(this,arguments)}}(),redirect:function(){this.transitionTo("universe.empire")}})
e.default=n}),define("incremental-empire/routes/universe/achievements",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/universe/empire",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var l=e[i](o),s=l.value}catch(u){return void n(u)}l.done?t(s):Promise.resolve(s).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Route.extend({model:function(){var e,n=(e=regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.modelFor("universe"),e.abrupt("return",t.get("mainEmpire"))
case 2:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function l(e){t(o,a,i,l,s,"next",e)}function s(e){t(o,a,i,l,s,"throw",e)}l(void 0)})})
return function(){return n.apply(this,arguments)}}()})
e.default=n}),define("incremental-empire/routes/universe/empire/population",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/universe/empire/ressources",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/universe/empire/ressources/energy",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/universe/empire/ressources/food",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/universe/empire/ressources/metal",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t})
define("incremental-empire/routes/universe/empire/ressources/stone",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/universe/empire/ressources/wood",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/universe/settings",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/universe/templates",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/routes/universe/upgrades",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("incremental-empire/serializers/application",["exports","ember-local-storage/serializers/serializer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"i3F7ejJs",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/application.hbs"}})
e.default=t}),define("incremental-empire/templates/universe",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"WZm0qhd/",block:'{"symbols":[],"statements":[[7,"nav"],[11,"class","navbar navbar-expand-lg navbar-light bg-light"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["navbar-brand","index"]],{"statements":[[0,"    "],[1,[25,["model","name"]],false],[0,"\\n"]],"parameters":[]},null],[0,"  "],[7,"div"],[11,"class","navbar-collapse"],[11,"id","navbarSupportedContent"],[9],[0,"\\n    "],[7,"ul"],[11,"class","navbar-nav mr-auto"],[9],[0,"\\n      "],[7,"li"],[11,"class","nav-item mx-2"],[9],[5,"fa-icon",[],[["@icon"],["users"]]],[0," "],[1,[25,["model","mainEmpire","population"]],false],[10],[0,"\\n      "],[7,"li"],[11,"class","nav-item mx-2"],[9],[5,"fa-icon",[],[["@icon"],["smile"]]],[0," 67%"],[10],[0,"\\n    "],[10],[0,"\\n    "],[7,"button"],[11,"class","mx-auto btn btn-secondary"],[12,"onclick",[29,"action",[[24,0,[]],"nextTurn"],null]],[11,"type","button"],[9],[0,"Turn "],[1,[25,["model","mainEmpire","turn"]],false],[10],[0,"\\n    "],[7,"ul"],[11,"class","navbar-nav"],[9],[0,"\\n      "],[7,"li"],[11,"class","nav-item mx-2"],[12,"hidden",[23,"isManaHidden"]],[9],[5,"fa-icon",[],[["@icon"],["dot-circle"]]],[0," "],[1,[25,["model","mana"]],false],[10],[0,"\\n      "],[7,"li"],[11,"class","nav-item mx-2"],[12,"hidden",[23,"isCultureHidden"]],[9],[5,"fa-icon",[],[["@icon"],["book"]]],[0," "],[1,[25,["model","culture"]],false],[10],[0,"\\n      "],[7,"li"],[11,"class","nav-item mx-2"],[12,"hidden",[23,"isMoneyHidden"]],[9],[5,"fa-icon",[],[["@icon"],["coins"]]],[0," "],[1,[25,["model","money"]],false],[10],[0,"\\n      "],[7,"li"],[11,"class","nav-item mx-2"],[12,"hidden",[23,"isScienceHidden"]],[9],[5,"fa-icon",[],[["@icon"],["flask"]]],[0," "],[1,[25,["model","science"]],false],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"ul"],[11,"class","nav nav-tabs"],[9],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","universe.empire.population"]],{"statements":[[0,"        Population\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","universe.empire.ressources"]],{"statements":[[0,"        Ressources\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","universe.upgrades"]],{"statements":[[0,"        Upgrades\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","universe.templates"]],{"statements":[[0,"        Templates\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","universe.achievements"]],{"statements":[[0,"        Achievements\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item ml-auto"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","universe.settings"]],{"statements":[[0,"        Settings\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe.hbs"}})
e.default=t}),define("incremental-empire/templates/universe/achievements",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"s6PxWhzD",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe/achievements.hbs"}})
e.default=t}),define("incremental-empire/templates/universe/empire",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"eACcXh01",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe/empire.hbs"}})
e.default=t}),define("incremental-empire/templates/universe/empire/population",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"SLo+cxF5",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"button"],[11,"class","btn btn-outline-success my-2"],[12,"onclick",[29,"action",[[24,0,[]],"popGeneration"],null]],[11,"type","button"],[9],[0,"Spontaneous Generation"],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe/empire/population.hbs"}})
e.default=t}),define("incremental-empire/templates/universe/empire/ressources",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"qaG8FoMz",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"div"],[11,"class","row"],[9],[0,"\\n    "],[7,"nav"],[11,"class","nav nav-pills flex-column border-right"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","universe.empire.ressources.food"]],{"statements":[[0,"        Food "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","food"]],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","universe.empire.ressources.wood"]],{"statements":[[0,"        Wood\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","universe.empire.ressources.stone"]],{"statements":[[0,"        Stone\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","universe.empire.ressources.metal"]],{"statements":[[0,"        Metal\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","universe.empire.ressources.energy"]],{"statements":[[0,"        Energy\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"div"],[11,"class","ml-2 mt-2"],[9],[0,"\\n      "],[1,[23,"outlet"],false],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe/empire/ressources.hbs"}})
e.default=t}),define("incremental-empire/templates/universe/empire/ressources/energy",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"m8cWFIkn",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe/empire/ressources/energy.hbs"}})
e.default=t}),define("incremental-empire/templates/universe/empire/ressources/food",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"dskGAdBy",block:'{"symbols":[],"statements":[[0,"Food is here.\\n"],[7,"button"],[11,"class","btn btn-outline-success my-2"],[12,"onclick",[29,"action",[[24,0,[]],"popFood"],null]],[11,"type","button"],[9],[0,"Horn of Plenty"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe/empire/ressources/food.hbs"}})
e.default=t}),define("incremental-empire/templates/universe/empire/ressources/metal",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"8Nq98v0J",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe/empire/ressources/metal.hbs"}})
e.default=t}),define("incremental-empire/templates/universe/empire/ressources/stone",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"Pk5kuHLk",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe/empire/ressources/stone.hbs"}})
e.default=t}),define("incremental-empire/templates/universe/empire/ressources/wood",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"M4oWRlk8",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe/empire/ressources/wood.hbs"}})
e.default=t}),define("incremental-empire/templates/universe/settings",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"Y6PMj1YU",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"button"],[11,"class","btn btn-outline-danger my-2 mx-auto"],[12,"onclick",[29,"action",[[24,0,[]],"destroyEverything"],null]],[11,"type","button"],[9],[0,"Clear save data"],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe/settings.hbs"}})
e.default=t}),define("incremental-empire/templates/universe/templates",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"k9BuXYOc",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"button"],[11,"class","btn btn-outline-danger my-2"],[12,"onclick",[29,"action",[[24,0,[]],"rebirth"],null]],[11,"type","button"],[9],[0,"End Empire"],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe/templates.hbs"}})
e.default=t}),define("incremental-empire/templates/universe/upgrades",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"jeu6pp/m",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/universe/upgrades.hbs"}})
e.default=t}),define("incremental-empire/config/environment",[],function(){try{var e="incremental-empire/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(r){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("incremental-empire/app").default.create({name:"incremental-empire",version:"0.0.0+fc512733"})
