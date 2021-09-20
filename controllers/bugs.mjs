export default function initBugsController(db) {
  const index = async (request, response) => {
    try {
      const bugs = await db.Bug.findAll();
      response.send({ bugs });
    } catch (error) {
      console.log(error);
    }
  };
  const create = async (request, response) => {
    try {
      response.render('home');
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const createForm = async (request, response) => {
    console.log(request.body);
    try {
      const bug = await db.Bug.create({

        problem: request.body.problem,
        error_text: request.body.errorText,
        commit: request.body.commit,
        feature_id: request.body.feature,

      });
      response.send({ bug });
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return {
    index, create, createForm,
  };
}
