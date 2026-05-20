const userRoutes = require('../../routes/userRoutes');

describe('User Routes', () => {
  it('should export a router', () => {
    expect(userRoutes).toBeDefined();
    expect(typeof userRoutes).toBe('function');
  });

  it('should have GET / route connected to getAll controller', () => {
    const stack = userRoutes.stack;
    const getRoute = stack.find(
      (layer) => layer.route?.path === '/' && layer.route?.methods.get
    );
    expect(getRoute).toBeDefined();
  });

  it('should have POST / route connected to create controller', () => {
    const stack = userRoutes.stack;
    const postRoute = stack.find(
      (layer) => layer.route?.path === '/' && layer.route?.methods.post
    );
    expect(postRoute).toBeDefined();
  });

  it('should have GET /me route connected to me controller with auth middleware', () => {
    const stack = userRoutes.stack;
    const getRoute = stack.find(
      (layer) => layer.route?.path === '/me' && layer.route?.methods.get
    );
    expect(getRoute).toBeDefined();
  });

  it('should have GET /:id route connected to getById controller', () => {
    const stack = userRoutes.stack;
    const getRoute = stack.find(
      (layer) => layer.route?.path === '/:id' && layer.route?.methods.get
    );
    expect(getRoute).toBeDefined();
  });

  it('should have POST /:id/favorites route connected to addFavorite controller', () => {
    const stack = userRoutes.stack;
    const postRoute = stack.find(
      (layer) =>
        layer.route?.path === '/:id/favorites' && layer.route?.methods.post
    );
    expect(postRoute).toBeDefined();
  });

  it('should have POST /register route connected to register controller', () => {
    const stack = userRoutes.stack;
    const postRoute = stack.find(
      (layer) => layer.route?.path === '/register' && layer.route?.methods.post
    );
    expect(postRoute).toBeDefined();
  });

  it('should have POST /login route connected to login controller', () => {
    const stack = userRoutes.stack;
    const postRoute = stack.find(
      (layer) => layer.route?.path === '/login' && layer.route?.methods.post
    );
    expect(postRoute).toBeDefined();
  });

  it('should have DELETE /:id/favorites route connected to removeFavorite controller', () => {
    const stack = userRoutes.stack;
    const deleteRoute = stack.find(
      (layer) =>
        layer.route?.path === '/:id/favorites' && layer.route?.methods.delete
    );
    expect(deleteRoute).toBeDefined();
  });
});
