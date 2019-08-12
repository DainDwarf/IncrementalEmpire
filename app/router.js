import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('empire', function() {
    this.route('population');
    this.route('food', function() {
      this.route('thing1');
      this.route('thing2');
    });
    this.route('material');
  });
  this.route('upgrades');
  this.route('templates', function() {
    this.route('template', { path: ':id' });
  });
  this.route('achievements');
  this.route('settings');
});

export default Router;
