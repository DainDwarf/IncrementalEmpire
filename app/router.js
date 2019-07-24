import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('empire', function() {
    this.route('population');
    this.route('ressources', function() {
      this.route('food');
      this.route('wood');
      this.route('stone');
      this.route('metal');
      this.route('energy');
    });
  });
  this.route('upgrades');
  this.route('templates');
  this.route('achievements');
  this.route('settings');
});

export default Router;
