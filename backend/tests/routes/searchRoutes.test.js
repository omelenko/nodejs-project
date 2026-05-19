const searchRoutes = require('../../routes/searchRoutes');
const searchController = require('../../controllers/searchController');

describe('Search Routes', () => {
  it('should export a router', () => {
    expect(searchRoutes).toBeDefined();
    expect(typeof searchRoutes).toBe('function');
  });

  it('should have GET / route connected to globalSearch controller', () => {
    const stack = searchRoutes.stack;
    const getRoute = stack.find((layer) => layer.route?.path === '/' && layer.route?.methods.get);
    expect(getRoute).toBeDefined();
  });
});
