import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('empire', function() {
    this.route('population');
    this.route('food');
    this.route('material');
    this.route('capital');
  });
  this.route('upgrades');
  this.route('templates', function() {
    this.route('template', { path: ':id' });
  });
  this.route('achievements');
  this.route('settings');
});

export default Router;
