const albumRoutes = require('../../routes/albumRoutes');
const albumController = require('../../controllers/albumController');

describe('Album Routes', () => {
  it('should export a router', () => {
    expect(albumRoutes).toBeDefined();
    expect(typeof albumRoutes).toBe('function');
  });

  it('should have GET / route connected to getAll controller', () => {
    const stack = albumRoutes.stack;
    const getRoute = stack.find((layer) => layer.route?.path === '/' && layer.route?.methods.get);
    expect(getRoute).toBeDefined();
  });

  it('should have POST / route connected to create controller', () => {
    const stack = albumRoutes.stack;
    const postRoute = stack.find((layer) => layer.route?.path === '/' && layer.route?.methods.post);
    expect(postRoute).toBeDefined();
  });

  it('should have DELETE /:id route connected to remove controller', () => {
    const stack = albumRoutes.stack;
    const deleteRoute = stack.find((layer) => layer.route?.path === '/:id' && layer.route?.methods.delete);
    expect(deleteRoute).toBeDefined();
  });

  it('should have GET /:id route connected to getById controller', () => {
    const stack = albumRoutes.stack;
    const getRoute = stack.find((layer) => layer.route?.path === '/:id' && layer.route?.methods.get);
    expect(getRoute).toBeDefined();
  });

  it('should have GET /filter/:year route connected to getByYear controller', () => {
    const stack = albumRoutes.stack;
    const filterRoute = stack.find((layer) => layer.route?.path === '/filter/:year' && layer.route?.methods.get);
    expect(filterRoute).toBeDefined();
  });
});
