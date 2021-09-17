export default function initBugsController(db) {
  const index = async (request, response) => {
    try {
      const bugs = await db.Bug.findAll();
      response.send({ items });
    } catch (error) {
      console.log(error);
    }
  };
  const create = async (request, response) => {
    try {
      response.render('createBug');
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const createForm = async (request, response) => {
    console.log(request.body);
    try {
      const data = await db.Bug.create({

        problem: request.body.problem,
        error_text: request.body.errorText,
        commit: request.body.commit,

      });
      response.send({ data });
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return {
    index, create, createForm,
  };
}
