import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('universe', function() {
    this.route('empire', function() {
      this.route('population');
      this.route('ressources');
    });
    this.route('upgrades');
    this.route('templates');
    this.route('achievements');
    this.route('settings');
  });
});

export default Router;
