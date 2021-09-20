export default function initFeaturesController(db) {
  const index = async (request, response) => {
    try {
      const features = await db.Feature.findAll();
      response.send({ features });
    } catch (error) {
      console.log(error);
    }
  };

  const createFeature = async (request, response) => {
    console.log(request.body);
    try {
      const feature = await db.Feature.create({
        name: request.body.feature,
      });
      response.send({ feature });
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  return {
    index, createFeature,
  };
}
