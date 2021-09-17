import db from './models/index.mjs';
import initBugsController from './controllers/bugs.mjs';

export default function bindRoutes(app) {
  const BugsController = initBugsController(db);
  app.get('/', BugsController.create);
  app.post('/', BugsController.createForm);
  // initialize the controller functions here
  // pass in the db for all callbacks

  // define your route matchers here using app
}
