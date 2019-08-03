"use strict"
define("incremental-empire/adapters/application",["exports","ember-local-storage/adapters/local"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/app",["exports","incremental-empire/resolver","ember-load-initializers","incremental-empire/config/environment"],function(e,t,n,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:t.default});(0,n.default)(a,r.default.modulePrefix)
var i=a
e.default=i}),define("incremental-empire/components/assign-point",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}function n(e){return function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Component.extend({canBeLess:!0,canBeMore:!0,onLess:function(){},onMore:function(){},lessColor:Ember.computed("canBeLess",function(){return this.canBeLess?"text-danger":"text-secondary"}),lessClickClass:Ember.computed("canBeLess",function(){return this.canBeLess?"click-icon":"click-icon-disabled"}),moreColor:Ember.computed("canBeMore",function(){return this.canBeMore?"text-success":"text-secondary"}),moreClickClass:Ember.computed("canBeMore",function(){return this.canBeMore?"click-icon":"click-icon-disabled"}),actions:{lessAssign:function(){var e=n(regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=1,t.shiftKey&&(n*=10),t.altKey&&(n*=100),e.next=5,this.onLess(n)
case 5:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),moreAssign:function(){var e=n(regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=1,t.shiftKey&&(n*=10),t.altKey&&(n*=100),e.next=5,this.onMore(n)
case 5:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}()}})
e.default=r}),define("incremental-empire/components/display-value",["exports","incremental-empire/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Component.extend({visible:!0,type:"",debug:t.default.APP.DEBUG,isVisible:Ember.computed.or("visible","debug"),hiddenEffect:Ember.computed("visible",function(){if(!this.visible)return"text-secondary"}),classNameBindings:["hiddenEffect"],icon:Ember.computed("type",function(){return{mana:"dot-circle",culture:"theater-masks",money:"coins",science:"flask",population:"users",happiness:"smile",magic:"magic"}[this.type]})})
e.default=n}),define("incremental-empire/components/ember-notify",["exports","ember-notify/components/ember-notify"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("incremental-empire/components/ember-notify/message",["exports","ember-notify/components/ember-notify/message"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("incremental-empire/components/fa-icon",["exports","@fortawesome/ember-fontawesome/components/fa-icon"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/controllers/achievements",["exports","incremental-empire/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({displayedAchievements:Ember.computed("model.@each.{isActive,isHidden}",function(){return t.default.APP.DEBUG?this.model:this.model.filter(function(e){return e.isActive||!e.isHidden})})})
e.default=n}),define("incremental-empire/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({})
e.default=t}),define("incremental-empire/controllers/empire",["exports","jquery"],function(e,t){function n(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Controller.extend({tabRoute:"empire.population",spellPointsDisplayed:Ember.computed.gt("model.maxSpellPoints",0),happinessUnlocked:!1,isLowFood:Ember.computed("model.{food,population}",function(){return this.model.food<this.model.population}),actions:{nextTurn:function(){var e,r=(e=regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.game.empire.nextTurn()
case 2:return e.next=4,this.game.checkAchievements()
case 4:if(0!=this.model.population){e.next=9
break}return(0,t.default)("#empireLostModal").modal(),this.model.set("dead",!0),e.next=9,this.model.save()
case 9:case"end":return e.stop()}},e,this)}),function(){var t=this,r=arguments
return new Promise(function(a,i){var o=e.apply(t,r)
function s(e){n(o,a,i,s,l,"next",e)}function l(e){n(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(){return r.apply(this,arguments)}}()}})
e.default=r}),define("incremental-empire/controllers/empire/food",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({empireCtl:Ember.inject.controller("empire"),isGenFoodOnCooldown:Ember.computed.lt("model.spellPoints",1),isGenFoodDisabled:Ember.computed.or("isGenFoodOnCooldown","model.dead"),actions:{genFood:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=1,this.game.getUpgrade("Click Power").isActive&&this.game.universe.mana>0&&(n=this.game.universe.mana),this.model.set("food",this.model.food+n),this.model.set("spellPoints",this.model.spellPoints-1),e.next=7,this.model.save()
case 7:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/empire/population",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({popPlural:Ember.computed.gt("model.population",1),genPopUpgrade:Ember.computed("this.game.upgrades",function(){return this.game.getUpgrade("Spontaneous Generation")}),isGenPopulationUnavailable:Ember.computed.not("genPopUpgrade.isActive"),isGenPopulationOnCooldown:Ember.computed.lt("model.spellPoints",5),isGenPopulationDisabled:Ember.computed.or("isGenPopulationOnCooldown","model.dead"),actions:{genPopulation:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),this.model.set("population",this.model.population+1),this.model.set("spellPoints",this.model.spellPoints-5),e.next=5,this.model.save()
case 5:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/controllers/settings",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}function n(e){return function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Controller.extend({saveData:"",actions:{updateUniverseName:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.game.universe.set("name",t),e.next=3,this.game.universe.save()
case 3:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),toggleDisplay:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.model.set("displayText",!this.model.displayText),e.next=3,this.model.save()
case 3:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),importEverything:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.importData(atob(this.saveData))
case 2:return e.next=4,this.game.load()
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),exportEverything:function(){var e=n(regeneratorRuntime.mark(function e(){var t=this
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.exportData(["universes","empires","upgrades","achievements","templates","settings"]).then(function(e){return t.set("saveData",btoa(e))})
case 2:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),destroyEverything:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!window.confirm("Are you sure? This will lose all your game progress and cannot be recovered in any way.")){e.next=7
break}return e.next=5,window.localStorage.clear()
case 5:return e.next=7,this.game.load()
case 7:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}()}})
e.default=r}),define("incremental-empire/controllers/templates",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}function n(e){return function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Controller.extend({tabRouteObj:void 0,canAddTemplate:Ember.computed.lt("model.length",3),actions:{newTemplate:function(){var e=n(regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,this.store.createRecord("template")
case 3:return n=e.sent,this.game.templates.pushObject(n),e.next=7,n.save()
case 7:this.transitionToRoute("templates.template",n.id)
case 8:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),deleteTemplate:function(){var e=n(regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findRecord("template",t,{backgroundReload:!1})
case 2:if(n=e.sent,!window.confirm("Are you sure? This will delete template "+n.name)){e.next=12
break}return e.next=7,n.destroyRecord()
case 7:return e.next=9,this.game.loadTemplates()
case 9:this.set("model",this.game.templates),this.tabRouteObj=void 0,this.transitionToRoute("templates")
case 12:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}()}})
e.default=r}),define("incremental-empire/controllers/templates/template",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}function n(e){return function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Controller.extend({activeAchievements:Ember.computed.filterBy("game.achievements","isActive",!0),templatePointsArray:Ember.computed.mapBy("activeAchievements","templatePoint"),templatePoints:Ember.computed.sum("templatePointsArray"),remainingTemplatePoints:Ember.computed("templatePoints","model.{popTP,foodTP}",function(){return this.templatePoints-(this.model.popTP+this.model.foodTP)}),rebirthPop:Ember.computed("model.popTP","game.achievements.@each.isActive",function(){var e=1
return this.game.getAchievement("Have 5 population").isActive&&(e*=4),1+this.model.popTP*e}),rebirthFood:Ember.computed("model.foodTP",function(){return 10*this.model.foodTP}),actions:{updateTemplateName:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.model.set("name",t),e.next=3,this.model.save()
case 3:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),lessPop:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.model.set("popTP",Math.max(this.model.popTP-t,0)),e.next=3,this.model.save()
case 3:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),morePop:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.model.set("popTP",this.model.popTP+Math.min(t,this.remainingTemplatePoints)),e.next=3,this.model.save()
case 3:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),lessFood:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.model.set("foodTP",Math.max(this.model.foodTP-t,0)),e.next=3,this.model.save()
case 3:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),moreFood:function(){var e=n(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.model.set("foodTP",this.model.foodTP+Math.min(t,this.remainingTemplatePoints)),e.next=3,this.model.save()
case 3:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}(),rebirth:function(){var e=n(regeneratorRuntime.mark(function e(t){var n
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,this.store.createRecord("empire",{name:this.model.name,population:this.rebirthPop,food:this.rebirthFood})
case 3:return n=e.sent,e.next=6,this.game.rebirth(n)
case 6:this.transitionToRoute("empire")
case 7:case"end":return e.stop()}},e,this)}))
return function(t){return e.apply(this,arguments)}}()}})
e.default=r}),define("incremental-empire/controllers/upgrades",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({actions:{buy:function(){var e,n=(e=regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.game.buyUpgrade(t)
case 2:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(e){return n.apply(this,arguments)}}()}})
e.default=n}),define("incremental-empire/helpers/and",["exports","ember-truth-helpers/helpers/and"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"and",{enumerable:!0,get:function(){return t.and}})}),define("incremental-empire/helpers/app-version",["exports","incremental-empire/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n){function r(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.default.APP.version,i=r.versionOnly||r.hideSha,o=r.shaOnly||r.hideVersion,s=null
return i&&(r.showExtended&&(s=a.match(n.versionExtendedRegExp)),s||(s=a.match(n.versionRegExp))),o&&(s=a.match(n.shaRegExp)),s?s[0]:a}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=r,e.default=void 0
var a=Ember.Helper.helper(r)
e.default=a}),define("incremental-empire/helpers/camelize",["exports","ember-cli-string-helpers/helpers/camelize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"camelize",{enumerable:!0,get:function(){return t.camelize}})}),define("incremental-empire/helpers/capitalize",["exports","ember-cli-string-helpers/helpers/capitalize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"capitalize",{enumerable:!0,get:function(){return t.capitalize}})}),define("incremental-empire/helpers/classify",["exports","ember-cli-string-helpers/helpers/classify"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"classify",{enumerable:!0,get:function(){return t.classify}})}),define("incremental-empire/helpers/dasherize",["exports","ember-cli-string-helpers/helpers/dasherize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"dasherize",{enumerable:!0,get:function(){return t.dasherize}})}),define("incremental-empire/helpers/eq",["exports","ember-truth-helpers/helpers/equal"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"equal",{enumerable:!0,get:function(){return t.equal}})}),define("incremental-empire/helpers/gt",["exports","ember-truth-helpers/helpers/gt"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"gt",{enumerable:!0,get:function(){return t.gt}})}),define("incremental-empire/helpers/gte",["exports","ember-truth-helpers/helpers/gte"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"gte",{enumerable:!0,get:function(){return t.gte}})}),define("incremental-empire/helpers/html-safe",["exports","ember-cli-string-helpers/helpers/html-safe"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"htmlSafe",{enumerable:!0,get:function(){return t.htmlSafe}})}),define("incremental-empire/helpers/humanize",["exports","ember-cli-string-helpers/helpers/humanize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"humanize",{enumerable:!0,get:function(){return t.humanize}})}),define("incremental-empire/helpers/is-array",["exports","ember-truth-helpers/helpers/is-array"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"isArray",{enumerable:!0,get:function(){return t.isArray}})}),define("incremental-empire/helpers/is-empty",["exports","ember-truth-helpers/helpers/is-empty"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/helpers/is-equal",["exports","ember-truth-helpers/helpers/is-equal"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"isEqual",{enumerable:!0,get:function(){return t.isEqual}})})
define("incremental-empire/helpers/lowercase",["exports","ember-cli-string-helpers/helpers/lowercase"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"lowercase",{enumerable:!0,get:function(){return t.lowercase}})}),define("incremental-empire/helpers/lt",["exports","ember-truth-helpers/helpers/lt"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"lt",{enumerable:!0,get:function(){return t.lt}})}),define("incremental-empire/helpers/lte",["exports","ember-truth-helpers/helpers/lte"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"lte",{enumerable:!0,get:function(){return t.lte}})}),define("incremental-empire/helpers/not-eq",["exports","ember-truth-helpers/helpers/not-equal"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"notEq",{enumerable:!0,get:function(){return t.notEq}})}),define("incremental-empire/helpers/not",["exports","ember-truth-helpers/helpers/not"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"not",{enumerable:!0,get:function(){return t.not}})}),define("incremental-empire/helpers/or",["exports","ember-truth-helpers/helpers/or"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"or",{enumerable:!0,get:function(){return t.or}})}),define("incremental-empire/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("incremental-empire/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("incremental-empire/helpers/titleize",["exports","ember-cli-string-helpers/helpers/titleize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"titleize",{enumerable:!0,get:function(){return t.titleize}})}),define("incremental-empire/helpers/trim",["exports","ember-cli-string-helpers/helpers/trim"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"trim",{enumerable:!0,get:function(){return t.trim}})}),define("incremental-empire/helpers/truncate",["exports","ember-cli-string-helpers/helpers/truncate"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"truncate",{enumerable:!0,get:function(){return t.truncate}})}),define("incremental-empire/helpers/underscore",["exports","ember-cli-string-helpers/helpers/underscore"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"underscore",{enumerable:!0,get:function(){return t.underscore}})}),define("incremental-empire/helpers/uppercase",["exports","ember-cli-string-helpers/helpers/uppercase"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"uppercase",{enumerable:!0,get:function(){return t.uppercase}})}),define("incremental-empire/helpers/w",["exports","ember-cli-string-helpers/helpers/w"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"w",{enumerable:!0,get:function(){return t.w}})}),define("incremental-empire/helpers/xor",["exports","ember-truth-helpers/helpers/xor"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"xor",{enumerable:!0,get:function(){return t.xor}})}),define("incremental-empire/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","incremental-empire/config/environment"],function(e,t,n){var r,a
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n.default.APP&&(r=n.default.APP.name,a=n.default.APP.version)
var i={name:"App Version",initialize:(0,t.default)(r,a)}
e.default=i}),define("incremental-empire/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=n}),define("incremental-empire/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"ember-data",initialize:t.default}
e.default=r}),define("incremental-empire/initializers/ember-keyboard-first-responder-inputs",["exports","ember-keyboard/initializers/ember-keyboard-first-responder-inputs"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"initialize",{enumerable:!0,get:function(){return t.initialize}})}),define("incremental-empire/initializers/export-application-global",["exports","incremental-empire/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var r,a=t.default.exportApplicationGlobal
r="string"==typeof a?a:Ember.String.classify(t.default.modulePrefix),n[r]||(n[r]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[r]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default=void 0
var r={name:"export-application-global",initialize:n}
e.default=r}),define("incremental-empire/initializers/game",["exports"],function(e){function t(e){e.inject("route","game","service:game"),e.inject("template","game","service:game"),e.inject("controller","game","service:game"),e.inject("component","game","service:game"),e.inject("model","game","service:game")}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=t,e.default=void 0
var n={initialize:t}
e.default=n}),define("incremental-empire/initializers/local-storage-adapter",["exports","ember-local-storage/initializers/local-storage-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"initialize",{enumerable:!0,get:function(){return t.initialize}})}),define("incremental-empire/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:t.default}
e.default=n}),define("incremental-empire/models/achievement",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model,r=t.default.attr,a=n.extend({name:r("string",{defaultValue:""}),isActive:r("boolean",{defaultValue:!1}),isHidden:r("boolean",{defaultValue:!1}),templatePoint:0,description:"",condition:void 0})
e.default=a}),define("incremental-empire/models/empire",["exports","ember-data"],function(e,t){function n(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default.Model,a=t.default.attr,i=r.extend({name:a("string",{defaultValue:"Empire"}),turn:a("number",{defaultValue:0}),population:a("number",{defaultValue:1}),dead:a("boolean",{defaultValue:!1}),food:a("number",{defaultValue:0}),material:a("number",{defaultValue:0}),metal:a("number",{defaultValue:0}),energy:a("number",{defaultValue:0}),spellPoints:a("number",{defaultValue:5}),maxSpellPoints:a("number",{defaultValue:5}),nextManaPoints:Ember.computed("population","turn",function(){var e=this.population,t=this.turn
return e>1&&t>20?Math.max(0,Math.floor(Math.sqrt((e-1)*(t/10-1)))):0}),nextTurn:function(){var e,t=(e=regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.food>=this.population?this.set("food",this.food-this.population):(this.set("population",this.food),this.set("food",0)),this.set("turn",this.turn+1),this.set("spellPoints",this.maxSpellPoints),e.next=5,this.save()
case 5:case"end":return e.stop()}},e,this)}),function(){var t=this,r=arguments
return new Promise(function(a,i){var o=e.apply(t,r)
function s(e){n(o,a,i,s,l,"next",e)}function l(e){n(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(){return t.apply(this,arguments)}}()})
e.default=i}),define("incremental-empire/models/setting",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default.Model,r=t.default.attr,a=n.extend({displayText:r("boolean",{defaultValue:!0})})
e.default=a}),define("incremental-empire/models/template",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
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
var t=Ember.Route.extend({model:function(){return this.game.achievements}})
e.default=t}),define("incremental-empire/routes/application",["exports","ember-keyboard"],function(e,t){function n(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Route.extend(t.EKMixin,{router:Ember.inject.service(),model:function(){var e,t=(e=regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.game.load()
case 2:return this.set("keyboardActivated",!0),e.abrupt("return",this.game.universe)
case 4:case"end":return e.stop()}},e,this)}),function(){var t=this,r=arguments
return new Promise(function(a,i){var o=e.apply(t,r)
function s(e){n(o,a,i,s,l,"next",e)}function l(e){n(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(){return t.apply(this,arguments)}}(),leftNavigation:Ember.on((0,t.keyUp)("ArrowLeft"),function(){switch(this.router.currentRouteName.split(".")[0]){case"empire":this.transitionTo("settings")
break
case"settings":this.transitionTo("achievements")
break
case"achievements":this.transitionTo("upgrades")
break
case"upgrades":this.transitionTo("templates")
break
case"templates":this.transitionTo("empire")}}),rightNavigation:Ember.on((0,t.keyUp)("ArrowRight"),function(){switch(this.router.currentRouteName.split(".")[0]){case"empire":this.transitionTo("templates")
break
case"templates":this.transitionTo("upgrades")
break
case"upgrades":this.transitionTo("achievements")
break
case"achievements":this.transitionTo("settings")
break
case"settings":this.transitionTo("empire")}})})
e.default=r}),define("incremental-empire/routes/empire",["exports","ember-keyboard"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Route.extend(t.EKMixin,{router:Ember.inject.service(),model:function(){return this.set("keyboardActivated",!0),this.game.empire},nextTurnShortcut:Ember.on((0,t.keyUp)("Space"),function(){this.controller.send("nextTurn")}),upNavigation:Ember.on((0,t.keyUp)("ArrowUp"),function(){switch(this.router.currentRouteName.split(".")[1]){case"energy":this.transitionTo("empire.metal")
break
case"metal":this.transitionTo("empire.material")
break
case"material":this.transitionTo("empire.food")
break
case"food":this.transitionTo("empire.population")
break
case"population":this.transitionTo("empire.energy")}}),downNavigation:Ember.on((0,t.keyUp)("ArrowDown"),function(){switch(this.router.currentRouteName.split(".")[1]){case"population":this.transitionTo("empire.food")
break
case"food":this.transitionTo("empire.material")
break
case"material":this.transitionTo("empire.metal")
break
case"metal":this.transitionTo("empire.energy")
break
case"energy":this.transitionTo("empire.population")}}),actions:{willTransition:function(e){e.to.name.startsWith("empire")||this.set("keyboardActivated",!1)}}})
e.default=n}),define("incremental-empire/routes/empire/energy",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({actions:{didTransition:function(){this.controllerFor("empire").set("tabRoute",this.routeName)}}})
e.default=t}),define("incremental-empire/routes/empire/food",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({actions:{didTransition:function(){this.controllerFor("empire").set("tabRoute",this.routeName)}}})
e.default=t}),define("incremental-empire/routes/empire/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({redirect:function(){var e=this.controllerFor("empire").tabRoute
this.transitionTo(e)}})
e.default=t}),define("incremental-empire/routes/empire/material",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({actions:{didTransition:function(){this.controllerFor("empire").set("tabRoute",this.routeName)}}})
e.default=t}),define("incremental-empire/routes/empire/metal",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({actions:{didTransition:function(){this.controllerFor("empire").set("tabRoute",this.routeName)}}})
e.default=t}),define("incremental-empire/routes/empire/population",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({actions:{didTransition:function(){this.controllerFor("empire").set("tabRoute",this.routeName)}}})
e.default=t}),define("incremental-empire/routes/settings",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(){return this.game.settings},resetController:function(e){e.set("saveData","")}})
e.default=t}),define("incremental-empire/routes/templates",["exports","ember-keyboard"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Route.extend(t.EKMixin,{router:Ember.inject.service(),model:function(){return this.set("keyboardActivated",!0),this.game.templates},upNavigation:Ember.on((0,t.keyUp)("ArrowUp"),function(){var e=this.router.currentURL.split("/"),t=e[e.length-1],n=this.game.templates
if("templates"==t)n.length>0&&this.transitionTo("templates.template",n[n.length-1])
else{var r=n.findIndex(function(e){return e.id==t})
this.transitionTo("templates.template",n[r>0?r-1:n.length-1])}}),downNavigation:Ember.on((0,t.keyUp)("ArrowDown"),function(){var e=this.router.currentURL.split("/"),t=e[e.length-1],n=this.game.templates
if("templates"==t)n.length>0&&this.transitionTo("templates.template",n[0])
else{var r=n.findIndex(function(e){return e.id==t})
this.transitionTo("templates.template",n[r+1<n.length?r+1:0])}}),actions:{willTransition:function(e){e.to.name.startsWith("templates")||this.set("keyboardActivated",!1)}}})
e.default=n}),define("incremental-empire/routes/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({redirect:function(){var e=this.controllerFor("templates").tabRouteObj
null!=e&&this.transitionTo("templates.template",e)}})
e.default=t}),define("incremental-empire/routes/templates/template",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(e){return this.store.findRecord("template",e.id)},actions:{didTransition:function(){this.controllerFor("templates").set("tabRouteObj",this.controller.model)}}})
e.default=t}),define("incremental-empire/routes/upgrades",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(){return this.game.upgrades}})
e.default=t}),define("incremental-empire/serializers/application",["exports","ember-local-storage/serializers/serializer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/services/game-template",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Service.extend({store:Ember.inject.service("store"),settings:void 0,universe:void 0,empire:void 0,upgrades:void 0,achievements:void 0,generate:function(){var e,n=(e=regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.createRecord("setting")
case 2:return this.settings=e.sent,e.next=5,this.store.createRecord("universe")
case 5:return this.universe=e.sent,e.next=8,this.store.createRecord("empire")
case 8:return this.empire=e.sent,e.next=11,this.store.createRecord("upgrade",{name:"Spontaneous Generation",manaCost:1,description:"You can now create more humans"})
case 11:return e.t0=e.sent,e.next=14,this.store.createRecord("upgrade",{name:"Click Power",manaCost:5,description:"Your god powers for generating ressources is multiplied by your current mana"})
case 14:return e.t1=e.sent,this.upgrades=[e.t0,e.t1],this.achievements=[],e.next=19,this.store.createRecord("achievement",{name:"Reach turn 10",templatePoint:1,description:"You can now assign template points to restart with more population"})
case 19:return(t=e.sent).reopen({condition:Ember.computed.gte("game.empire.turn",10)}),this.achievements.push(t),e.next=24,this.store.createRecord("achievement",{name:"Have 5 population",templatePoint:1,description:"Template Point gives 4x more population"})
case 24:return(t=e.sent).reopen({condition:Ember.computed.gte("game.empire.population",5)}),this.achievements.push(t),e.next=29,this.store.createRecord("achievement",{isHidden:!0,name:"Lose an empire",templatePoint:1,description:"You let all the population die, you monster!"})
case 29:(t=e.sent).reopen({condition:Ember.computed.equal("game.empire.population",0)}),this.achievements.push(t)
case 32:case"end":return e.stop()}},e,this)}),function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})})
return function(){return n.apply(this,arguments)}}()})
e.default=n}),define("incremental-empire/services/game",["exports"],function(e){function t(e,t,n,r,a,i,o){try{var s=e[i](o),l=s.value}catch(u){return void n(u)}s.done?t(l):Promise.resolve(l).then(r,a)}function n(e){return function(){var n=this,r=arguments
return new Promise(function(a,i){var o=e.apply(n,r)
function s(e){t(o,a,i,s,l,"next",e)}function l(e){t(o,a,i,s,l,"throw",e)}s(void 0)})}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Service.extend({store:Ember.inject.service(),notify:Ember.inject.service(),gameTemplate:Ember.inject.service("game-template"),settings:void 0,universe:void 0,empire:void 0,upgrades:void 0,achievements:void 0,templates:void 0,load:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.loadSettings()
case 2:return e.next=4,this.loadUniverse()
case 4:return e.next=6,this.loadEmpire()
case 6:return e.next=8,this.loadUpgrades()
case 8:return e.next=10,this.loadAchievements()
case 10:return e.next=12,this.loadTemplates()
case 12:return e.next=14,this.consolidateSave()
case 14:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),loadSettings:function(){var e=n(regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("setting").then(function(e){return e.get("firstObject")})
case 2:t=e.sent,this.set("settings",t)
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),loadUniverse:function(){var e=n(regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("universe").then(function(e){return e.get("firstObject")})
case 2:t=e.sent,this.set("universe",t)
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),loadEmpire:function(){var e=n(regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("empire").then(function(e){return e.get("firstObject")})
case 2:t=e.sent,this.set("empire",t)
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),loadUpgrades:function(){var e=n(regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("upgrade")
case 2:t=e.sent,this.set("upgrades",t.toArray())
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),loadAchievements:function(){var e=n(regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("achievement")
case 2:t=e.sent,this.set("achievements",t.toArray())
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),loadTemplates:function(){var e=n(regeneratorRuntime.mark(function e(){var t
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.store.findAll("template")
case 2:t=e.sent,this.set("templates",t.toArray())
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),consolidateSave:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.gameTemplate.generate()
case 2:return e.next=4,this.consolidateSettings()
case 4:return e.next=6,this.consolidateUniverse()
case 6:return e.next=8,this.consolidateEmpire()
case 8:return e.next=10,this.consolidateUpgrades()
case 10:return e.next=12,this.consolidateAchievements()
case 12:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),consolidateSettings:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=this.settings){e.next=4
break}return this.set("settings",this.gameTemplate.settings),e.next=4,this.settings.save()
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),consolidateUniverse:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=this.universe){e.next=4
break}return this.set("universe",this.gameTemplate.universe),e.next=4,this.universe.save()
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),consolidateEmpire:function(){var e=n(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=this.empire){e.next=4
break}return this.set("empire",this.gameTemplate.empire),e.next=4,this.empire.save()
case 4:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),consolidateUpgrades:function(){var e=n(regeneratorRuntime.mark(function e(){var t,n,r
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=0
case 1:if(!(t<this.gameTemplate.upgrades.length)){e.next=18
break}if(n=this.gameTemplate.upgrades[t],null!=(r=this.getUpgrade(n.name))){e.next=10
break}return this.upgrades.pushObject(n),e.next=8,n.save()
case 8:e.next=15
break
case 10:r.set("manaCost",n.manaCost),r.set("cultureCost",n.cultureCost),r.set("moneyCost",n.moneyCost),r.set("scienceCost",n.scienceCost),r.set("description",n.description)
case 15:t++,e.next=1
break
case 18:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),consolidateAchievements:function(){var e=n(regeneratorRuntime.mark(function e(){var t,n,r
return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=0
case 1:if(!(t<this.gameTemplate.achievements.length)){e.next=16
break}if(n=this.gameTemplate.achievements[t],null!=(r=this.getAchievement(n.name))){e.next=10
break}return this.achievements.pushObject(n),e.next=8,n.save()
case 8:e.next=13
break
case 10:r.set("templatePoint",n.templatePoint),r.set("description",n.description),r.reopen({condition:n.condition})
case 13:t++,e.next=1
break
case 16:case"end":return e.stop()}},e,this)}))
return function(){return e.apply(this,arguments)}}(),getUpgrade:function(e){var t=!0,n=!1,r=void 0
try{for(var a,i=this.upgrades[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var o=a.value
if(o.name==e)return o}}catch(s){n=!0,r=s}finally{try{t||null==i.return||i.return()}finally{if(n)throw r}}},getAchievement:function(e){var t=!0,n=!1,r=void 0
try{for(var a,i=this.achievements[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var o=a.value
if(o.name==e)return o}}catch(s){n=!0,r=s}finally{try{t||null==i.return||i.return()}finally{if(n)throw r}}},rebirth:function(){var e=n(regeneratorRuntime.mark(function e(t){var n
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
e.default=r}),define("incremental-empire/services/keyboard",["exports","ember-keyboard/services/keyboard"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/services/notify",["exports","ember-notify"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("incremental-empire/templates/achievements",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"oxNw2t/I",block:'{"symbols":["achievement"],"statements":[[7,"div"],[11,"class","row mx-2 my-2"],[9],[0,"\\n"],[4,"each",[[25,["displayedAchievements"]]],null,{"statements":[[0,"    "],[7,"div"],[11,"class","col-sm-3"],[9],[0,"\\n      "],[7,"div"],[12,"class",[30,["card ",[29,"unless",[[24,1,["isActive"]],"text-muted"],null]]]],[9],[0,"\\n        "],[7,"div"],[12,"class",[30,["card-header ",[29,"if",[[24,1,["isActive"]],"bg-success"],null]]]],[9],[0,"\\n          "],[1,[24,1,["name"]],false],[0,"\\n        "],[10],[0,"\\n        "],[7,"div"],[11,"class","card-body"],[9],[0,"\\n          "],[7,"p"],[11,"class","card-text"],[9],[1,[24,1,["description"]],false],[10],[0,"\\n        "],[10],[0,"\\n"],[4,"if",[[24,1,["templatePoint"]]],null,{"statements":[[0,"          "],[7,"footer"],[11,"class","mx-1 text-right"],[9],[0,"\\n            "],[7,"small"],[9],[0,"\\n              Reward: "],[1,[24,1,["templatePoint"]],false],[0," Template Point\\n            "],[10],[0,"\\n          "],[10],[0,"\\n"]],"parameters":[]},null],[0,"      "],[10],[0,"\\n    "],[10],[0,"\\n"]],"parameters":[1]},null],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/achievements.hbs"}})
e.default=t}),define("incremental-empire/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"Va47fBJF",block:'{"symbols":["message"],"statements":[[4,"ember-notify",null,[["messageStyle"],["bootstrap"]],{"statements":[[4,"link-to",null,[["route"],["achievements"]],{"statements":[[0,"    "],[1,[24,1,["text"]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[1]},null],[7,"div"],[11,"class","modal fade"],[11,"id","empireLostModal"],[11,"tabindex","-1"],[11,"role","dialog"],[9],[0,"\\n  "],[7,"div"],[11,"class","modal-dialog"],[11,"role","document"],[9],[0,"\\n    "],[7,"div"],[11,"class","modal-content"],[9],[0,"\\n      "],[7,"div"],[11,"class","modal-header"],[9],[0,"\\n        "],[7,"h5"],[11,"class","modal-title"],[9],[1,[25,["game","empire","name"]],false],[0," final years"],[10],[0,"\\n      "],[10],[0,"\\n      "],[7,"div"],[11,"class","modal-body"],[9],[0,"\\n        "],[1,[25,["game","empire","name"]],false],[0," has lost all its people. You will need to start over with a new empire, and be careful next time.\\n      "],[10],[0,"\\n      "],[7,"div"],[11,"class","modal-footer"],[9],[0,"\\n        "],[7,"button"],[11,"class","btn btn-secondary"],[11,"data-dismiss","modal"],[11,"type","button"],[9],[0,"Close"],[10],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[7,"nav"],[11,"class","navbar navbar-expand-lg navbar-light bg-light"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["navbar-brand mr-auto","index"]],{"statements":[[0,"    "],[1,[25,["model","name"]],false],[0,"\\n"]],"parameters":[]},null],[0,"  "],[7,"ul"],[11,"class","navbar-nav"],[9],[0,"\\n    "],[5,"display-value",[],[["@tagName","@class","@visible","@type","@value"],["li","nav-item mx-2",[25,["model","manaUnlocked"]],"mana",[25,["model","mana"]]]]],[0,"\\n    "],[5,"display-value",[],[["@tagName","@class","@visible","@type","@value"],["li","nav-item mx-2",[25,["model","cultureUnlocked"]],"culture",[25,["model","culture"]]]]],[0,"\\n    "],[5,"display-value",[],[["@tagName","@class","@visible","@type","@value"],["li","nav-item mx-2",[25,["model","moneyUnlocked"]],"money",[25,["model","money"]]]]],[0,"\\n    "],[5,"display-value",[],[["@tagName","@class","@visible","@type","@value"],["li","nav-item mx-2",[25,["model","scienceUnlocked"]],"science",[25,["model","science"]]]]],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"ul"],[11,"class","nav nav-tabs"],[9],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","empire"]],{"statements":[[0,"        "],[1,[24,0,["game","empire","name"]],false],[0,"\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","templates"]],{"statements":[[0,"        Templates\\n"],[4,"if",[[25,["game","empire","nextManaPoints"]]],null,{"statements":[[0,"          "],[5,"display-value",[],[["@tagName","@class","@type","@value"],["span","badge badge-pill badge-secondary","mana",[25,["game","empire","nextManaPoints"]]]]],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","upgrades"]],{"statements":[[0,"        Upgrades\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","achievements"]],{"statements":[[0,"        Achievements\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"li"],[11,"class","nav-item ml-auto"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","settings"]],{"statements":[[0,"        Settings\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/application.hbs"}})
e.default=t}),define("incremental-empire/templates/components/assign-point",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"QL8/aoIN",block:'{"symbols":["&default"],"statements":[[5,"fa-icon",[],[["@icon","@class","@click"],["minus-circle",[30,[[23,"lessClickClass"]," ",[23,"lessColor"]]],[29,"action",[[24,0,[]],"lessAssign"],null]]]],[0,"\\n  "],[15,1],[0,"\\n"],[5,"fa-icon",[],[["@icon","@class","@click"],["plus-circle",[30,[[23,"moreClickClass"]," ",[23,"moreColor"]]],[29,"action",[[24,0,[]],"moreAssign"],null]]]]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/components/assign-point.hbs"}})
e.default=t}),define("incremental-empire/templates/components/display-value",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"KmfPj/qu",block:'{"symbols":["@value","&default"],"statements":[[4,"if",[[25,["game","settings","displayText"]]],null,{"statements":[[0,"  "],[1,[29,"capitalize",[[25,["type"]]],null],false],[0,": "],[1,[24,1,[]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[5,"fa-icon",[],[["@icon"],[[23,"icon"]]]],[0," "],[1,[24,1,[]],false],[0,"\\n"]],"parameters":[]}],[15,2]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/components/display-value.hbs"}})
e.default=t}),define("incremental-empire/templates/empire",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"rNaclrsi",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"div"],[11,"class","row"],[9],[0,"\\n    "],[7,"nav"],[11,"class","nav nav-pills flex-column border-right w-15"],[9],[0,"\\n"],[4,"link-to",null,[["class","route"],["nav-link","empire.population"]],{"statements":[[0,"        Population "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","population"]],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","empire.food"]],{"statements":[[0,"        Food "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","food"]],false],[10],[0,"\\n"],[4,"if",[[25,["isLowFood"]]],null,{"statements":[[0,"          "],[5,"fa-icon",[[13,"class","float-right text-danger"]],[["@icon"],["exclamation"]]],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","empire.material"]],{"statements":[[0,"        Material "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","material"]],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","empire.metal"]],{"statements":[[0,"        Metal "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","metal"]],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"link-to",null,[["class","route"],["nav-link","empire.energy"]],{"statements":[[0,"        Energy "],[7,"span"],[11,"class","badge badge-pill badge-light"],[9],[1,[25,["model","energy"]],false],[10],[0,"\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"div"],[11,"class","w-85"],[9],[0,"\\n      "],[7,"nav"],[11,"class","navbar navbar-expand-lg navbar-light bg-light"],[9],[0,"\\n        "],[7,"ul"],[11,"class","navbar-nav mr-auto"],[9],[0,"\\n          "],[5,"display-value",[],[["@tagName","@class","@type","@value"],["li","nav-item mx-2","population",[25,["model","population"]]]]],[0,"\\n          "],[5,"display-value",[],[["@tagName","@class","@type","@visible","@value"],["li","nav-item mx-2","happiness",[23,"happinessUnlocked"],"67%"]]],[0,"\\n          "],[5,"display-value",[],[["@tagName","@class","@type","@visible","@value"],["li","nav-item mx-2","magic",[23,"spellPointsDisplayed"],[30,[[25,["model","spellPoints"]],"/",[25,["model","maxSpellPoints"]]]]]]],[0,"\\n        "],[10],[0,"\\n        "],[7,"button"],[11,"class","btn btn-primary"],[12,"onclick",[29,"action",[[24,0,[]],"nextTurn"],null]],[12,"disabled",[25,["model","dead"]]],[11,"type","button"],[9],[0,"Turn "],[1,[25,["model","turn"]],false],[10],[0,"\\n      "],[10],[0,"\\n      "],[7,"div"],[12,"class",[30,["container h-100 ",[29,"if",[[25,["model","dead"]],"bg-secondary"],null]]]],[9],[0,"\\n        "],[1,[23,"outlet"],false],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/energy",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"FNPaZTru",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/energy.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/food",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"GZcwwpyN",block:'{"symbols":[],"statements":[[7,"div"],[9],[0,"\\n  "],[1,[25,["model","name"]],false],[0," currently has "],[1,[25,["model","food"]],false],[0," food.\\n"],[10],[0,"\\n"],[4,"if",[[25,["empireCtl","isLowFood"]]],null,{"statements":[[0,"  "],[7,"div"],[9],[0,"\\n    You will lose some population next turn.\\n  "],[10],[0,"\\n"]],"parameters":[]},null],[7,"button"],[11,"class","btn btn-outline-success"],[12,"disabled",[23,"isGenFoodDisabled"]],[12,"onclick",[29,"action",[[24,0,[]],"genFood"],null]],[11,"type","button"],[9],[0,"\\n  Horn of Plenty "],[5,"display-value",[],[["@tagName","@type","@value"],["small","magic","1"]]],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/food.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"jRmi9VD5",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/index.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/material",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"R2rIHb+Z",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/material.hbs"}})
e.default=t})
define("incremental-empire/templates/empire/metal",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"n14kJA+U",block:'{"symbols":[],"statements":[[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/metal.hbs"}})
e.default=t}),define("incremental-empire/templates/empire/population",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"e6tm3ORH",block:'{"symbols":[],"statements":[[7,"div"],[9],[0,"\\n  "],[1,[25,["model","name"]],false],[0," currently has "],[1,[25,["model","population"]],false],[0," human"],[1,[29,"if",[[25,["popPlural"]],"s"],null],false],[0,". "],[1,[29,"if",[[25,["popPlural"]],"They","It"],null],false],[0," will need "],[1,[25,["model","population"]],false],[0," food to survive next turn.\\n"],[10],[0,"\\n"],[7,"button"],[11,"class","btn btn-outline-success"],[12,"hidden",[23,"isGenPopulationUnavailable"]],[12,"disabled",[23,"isGenPopulationDisabled"]],[12,"onclick",[29,"action",[[24,0,[]],"genPopulation"],null]],[11,"type","button"],[9],[0,"\\n  Spontaneous Generation "],[5,"display-value",[],[["@tagName","@type","@value"],["small","magic","5"]]],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/empire/population.hbs"}})
e.default=t}),define("incremental-empire/templates/settings",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"jCdOP8oK",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  Game name: "],[5,"input",[[13,"value",[25,["game","universe","name"]]]],[["@focus-out"],[[29,"action",[[24,0,[]],"updateUniverseName"],null]]]],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"button"],[11,"class","btn my-2 btn-outline-primary"],[12,"onclick",[29,"action",[[24,0,[]],"toggleDisplay"],null]],[11,"type","button"],[9],[0,"Display "],[1,[29,"if",[[25,["model","displayText"]],"text","icon"],null],false],[10],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"button"],[11,"class","btn my-2 btn-outline-secondary"],[12,"onclick",[29,"action",[[24,0,[]],"exportEverything"],null]],[11,"type","button"],[9],[0,"Export save data"],[10],[0,"\\n  "],[7,"button"],[11,"class","btn my-2 btn-outline-secondary"],[12,"onclick",[29,"action",[[24,0,[]],"importEverything"],null]],[11,"type","button"],[9],[0,"Import save data"],[10],[0,"\\n  "],[7,"button"],[11,"class","btn btn-danger my-2"],[12,"onclick",[29,"action",[[24,0,[]],"destroyEverything"],null]],[11,"type","button"],[9],[0,"Clear save data"],[10],[0,"\\n  "],[7,"span"],[9],[0,"(Reload the page after changing the save)"],[10],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"class","container w-100"],[9],[0,"\\n  "],[5,"textarea",[[13,"class","w-100"],[13,"rows","8"],[13,"placeholder","Copy your save data here."]],[["@value"],[[23,"saveData"]]]],[0,""],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/settings.hbs"}})
e.default=t}),define("incremental-empire/templates/templates",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"VszbNJQU",block:'{"symbols":["template"],"statements":[[7,"div"],[11,"class","container-fluid"],[9],[0,"\\n  "],[7,"div"],[11,"class","row"],[9],[0,"\\n    "],[7,"nav"],[11,"class","ml-2 nav nav-pills flex-column border-right w-15"],[9],[0,"\\n"],[4,"each",[[25,["model"]]],null,{"statements":[[0,"        "],[7,"div"],[11,"class","row"],[9],[0,"\\n          "],[7,"div"],[11,"class","col"],[9],[0,"\\n"],[4,"link-to",null,[["class","route","model"],["nav-link","templates.template",[24,1,["id"]]]],{"statements":[[0,"              "],[1,[24,1,["name"]],false],[0,"\\n"]],"parameters":[]},null],[0,"          "],[10],[0,"\\n          "],[7,"div"],[11,"class","col mr-1"],[9],[0,"\\n            "],[7,"button"],[11,"class","close"],[12,"onclick",[29,"action",[[24,0,[]],"deleteTemplate",[24,1,["id"]]],null]],[11,"type","button"],[9],[0,"×"],[10],[0,"\\n          "],[10],[0,"\\n        "],[10],[0,"\\n"]],"parameters":[1]},null],[4,"if",[[25,["canAddTemplate"]]],null,{"statements":[[0,"        "],[7,"button"],[11,"typ","button"],[11,"class","btn"],[12,"onclick",[29,"action",[[24,0,[]],"newTemplate"],null]],[9],[0,"Add new template"],[10],[0,"\\n"]],"parameters":[]},null],[0,"    "],[10],[0,"\\n    "],[7,"div"],[11,"class","border w-80"],[9],[0,"\\n      "],[1,[23,"outlet"],false],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"],[10]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/templates.hbs"}})
e.default=t}),define("incremental-empire/templates/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"OO3f23Sn",block:'{"symbols":[],"statements":[[0,"Click \\"Add new template\\" to design a new empire."]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/templates/index.hbs"}})
e.default=t}),define("incremental-empire/templates/templates/template",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"OkkeL3Ce",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","container-fluid bg-light"],[9],[0,"\\n  "],[5,"input",[[13,"value",[25,["model","name"]]]],[["@focus-out"],[[29,"action",[[24,0,[]],"updateTemplateName"],null]]]],[0,"\\n  "],[7,"span"],[11,"class","float-right"],[9],[0,"You have "],[1,[23,"remainingTemplatePoints"],false],[0,"/"],[1,[23,"templatePoints"],false],[0," template points"],[10],[0,"\\n"],[10],[0,"\\n"],[5,"assign-point",[],[["@class","@onLess","@onMore","@canBeLess","@canBeMore"],["ml-2",[29,"action",[[24,0,[]],"lessPop"],null],[29,"action",[[24,0,[]],"morePop"],null],[29,"gt",[[25,["model","popTP"]],0],null],[29,"gt",[[25,["remainingTemplatePoints"]],0],null]]],{"statements":[[0,"\\n  Population: "],[1,[23,"rebirthPop"],false],[0," ("],[1,[25,["model","popTP"]],false],[0," TP)\\n"]],"parameters":[]}],[0,"\\n"],[5,"assign-point",[],[["@class","@onLess","@onMore","@canBeLess","@canBeMore"],["ml-2",[29,"action",[[24,0,[]],"lessFood"],null],[29,"action",[[24,0,[]],"moreFood"],null],[29,"gt",[[25,["model","foodTP"]],0],null],[29,"gt",[[25,["remainingTemplatePoints"]],0],null]]],{"statements":[[0,"\\n  Food: "],[1,[23,"rebirthFood"],false],[0," ("],[1,[25,["model","foodTP"]],false],[0," TP)\\n"]],"parameters":[]}],[0,"\\n"],[7,"div"],[11,"class","container"],[9],[0,"\\n  "],[7,"button"],[11,"class","btn btn-outline-danger my-2"],[12,"onclick",[29,"action",[[24,0,[]],"rebirth"],null]],[11,"type","button"],[9],[0,"\\n    Restart with this empire and gain "],[5,"display-value",[],[["@tagName","@type","@value"],["span","mana",[25,["game","empire","nextManaPoints"]]]]],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[7,"div"],[11,"class","container small"],[9],[0,"\\n  Religious empires produces more "],[5,"display-value",[],[["@tagName","@type","@value"],["span","mana",""]]],[0," if you have more population and spend more turns. You need at least 2 population and 21 turns to start producing "],[5,"display-value",[],[["@tagName","@type","@value"],["span","mana",""]]],[0,"\\n"],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/templates/template.hbs"}})
e.default=t}),define("incremental-empire/templates/upgrades",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"XsMUFU08",block:'{"symbols":["upgrade"],"statements":[[7,"div"],[11,"class","row mx-2 my-2"],[9],[0,"\\n"],[4,"each",[[25,["model"]]],null,{"statements":[[0,"    "],[7,"div"],[11,"class","col-sm-3"],[9],[0,"\\n      "],[7,"div"],[11,"class","card"],[9],[0,"\\n        "],[7,"div"],[12,"class",[30,["card-header ",[29,"if",[[24,1,["isActive"]],"bg-success"],null]]]],[9],[0,"\\n          "],[1,[24,1,["name"]],false],[0,"\\n        "],[10],[0,"\\n        "],[7,"div"],[11,"class","card-body"],[9],[0,"\\n          "],[7,"p"],[11,"class","card-text"],[9],[1,[24,1,["description"]],false],[10],[0,"\\n          "],[7,"button"],[11,"class","btn btn-primary"],[12,"hidden",[24,1,["isActive"]]],[12,"disabled",[24,1,["cannotBuy"]]],[12,"onclick",[29,"action",[[24,0,[]],"buy",[24,1,[]]],null]],[11,"type","button"],[9],[0,"\\n            Buy for\\n"],[4,"if",[[24,1,["manaCost"]]],null,{"statements":[[0,"              "],[5,"display-value",[],[["@tagName","@type","@value"],["span","mana",[24,1,["manaCost"]]]]],[0,"\\n"]],"parameters":[]},null],[4,"if",[[24,1,["cultureCost"]]],null,{"statements":[[0,"              "],[5,"display-value",[],[["@tagName","@type","@value"],["span","culture",[24,1,["cultureCost"]]]]],[0,"\\n"]],"parameters":[]},null],[4,"if",[[24,1,["moneyCost"]]],null,{"statements":[[0,"              "],[5,"display-value",[],[["@tagName","@type","@value"],["span","money",[24,1,["moneyCost"]]]]],[0,"\\n"]],"parameters":[]},null],[4,"if",[[24,1,["scienceCost"]]],null,{"statements":[[0,"              "],[5,"display-value",[],[["@tagName","@type","@value"],["span","science",[24,1,["scienceCost"]]]]],[0,"\\n"]],"parameters":[]},null],[0,"          "],[10],[0,"\\n        "],[10],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n"]],"parameters":[1]},null],[10],[0,"\\n"],[1,[23,"outlet"],false]],"hasEval":false}',meta:{moduleName:"incremental-empire/templates/upgrades.hbs"}})
e.default=t}),define("incremental-empire/utils/get-cmd-key",["exports","ember-keyboard/utils/get-cmd-key"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/utils/listener-name",["exports","ember-keyboard/utils/listener-name"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/utils/titleize",["exports","ember-cli-string-helpers/utils/titleize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("incremental-empire/config/environment",[],function(){try{var e="incremental-empire/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(r){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("incremental-empire/app").default.create({DEBUG:!1,name:"incremental-empire",version:"0.0.0+c77cbbea"})
