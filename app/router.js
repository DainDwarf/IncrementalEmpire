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
    this.route('metal');
  });
  this.route('upgrades', function() {
    this.route('religious');
    this.route('economical');
    this.route('military');
    this.route('scientific');
    this.route('others');
  });
  this.route('templates', function() {
    this.route('template', { path: ':id' });
  });
  this.route('achievements');
  this.route('settings');
});

export default Router;
