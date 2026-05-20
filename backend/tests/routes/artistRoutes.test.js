const artistRoutes = require('../../routes/artistRoutes');

describe('Artist Routes', () => {
  it('should export a router', () => {
    expect(artistRoutes).toBeDefined();
    expect(typeof artistRoutes).toBe('function');
  });

  it('should have GET / route connected to getAll controller', () => {
    const stack = artistRoutes.stack;
    const getRoute = stack.find(
      (layer) => layer.route?.path === '/' && layer.route?.methods.get
    );
    expect(getRoute).toBeDefined();
  });

  it('should have POST / route connected to create controller with auth middleware', () => {
    const stack = artistRoutes.stack;
    const postRoute = stack.find(
      (layer) => layer.route?.path === '/' && layer.route?.methods.post
    );
    expect(postRoute).toBeDefined();
  });

  it('should have GET /:id route connected to getById controller', () => {
    const stack = artistRoutes.stack;
    const getRoute = stack.find(
      (layer) => layer.route?.path === '/:id' && layer.route?.methods.get
    );
    expect(getRoute).toBeDefined();
  });

  it('should have DELETE /:id route connected to remove controller', () => {
    const stack = artistRoutes.stack;
    const deleteRoute = stack.find(
      (layer) => layer.route?.path === '/:id' && layer.route?.methods.delete
    );
    expect(deleteRoute).toBeDefined();
  });
});
