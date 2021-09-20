import db from './models/index.mjs';
import initBugsController from './controllers/bugs.mjs';
import initFeaturesController from './controllers/features.mjs';
import initUsersController from './controllers/users.mjs';

export default function bindRoutes(app) {
  const BugsController = initBugsController(db);
  const FeaturesController = initFeaturesController(db);
  app.get('/', BugsController.create);
  app.post('/', BugsController.createForm);
  app.get('/index', BugsController.index);
  app.get('/features', FeaturesController.index);
  app.post('/createFeature', FeaturesController.createFeature);
  // initialize the controller functions here
  // pass in the db for all callbacks
  // define your route matchers here using app
}
