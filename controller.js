import { helloWorld, getKeywords, getProductsByKeyword } from './service.js';

const routes = async (app, options) => {
  app.get('/', async (request, reply) => {
    const result = await helloWorld();
    reply.send({ result });
  });

  app.post('/keywords', async (request, reply) => {
    try {
      const { text } = request.body;
      console.log(text);
      const keywords = await getKeywords(text);
      const products = await getProductsByKeyword(keywords, 1, 20);
      if (products.length > 0) {
        reply.send(products);
      } else {
        reply.code(404).send({ message: 'No products found' });
      }
    } catch (error) {
      console.error(error);
      reply.code(500).send({ message: 'Internal server error' });
    }
  });
};

export { routes };
