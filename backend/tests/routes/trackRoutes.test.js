const trackRoutes = require('../../routes/trackRoutes');
const trackController = require('../../controllers/trackController');

describe('Track Routes', () => {
  it('should export a router', () => {
    expect(trackRoutes).toBeDefined();
    expect(typeof trackRoutes).toBe('function');
  });

  it('should have GET / route connected to getAll controller', () => {
    const stack = trackRoutes.stack;
    const getRoute = stack.find((layer) => layer.route?.path === '/' && layer.route?.methods.get);
    expect(getRoute).toBeDefined();
  });

  it('should have GET /:id route connected to getById controller', () => {
    const stack = trackRoutes.stack;
    const getRoute = stack.find((layer) => layer.route?.path === '/:id' && layer.route?.methods.get);
    expect(getRoute).toBeDefined();
  });

  it('should have POST / route connected to create controller', () => {
    const stack = trackRoutes.stack;
    const postRoute = stack.find((layer) => layer.route?.path === '/' && layer.route?.methods.post);
    expect(postRoute).toBeDefined();
  });

  it('should have DELETE /:id route connected to remove controller', () => {
    const stack = trackRoutes.stack;
    const deleteRoute = stack.find((layer) => layer.route?.path === '/:id' && layer.route?.methods.delete);
    expect(deleteRoute).toBeDefined();
  });
});
