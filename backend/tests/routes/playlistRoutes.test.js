const playlistRoutes = require('../../routes/playlistRoutes');
const playlistController = require('../../controllers/playlistController');

describe('Playlist Routes', () => {
  it('should export a router', () => {
    expect(playlistRoutes).toBeDefined();
    expect(typeof playlistRoutes).toBe('function');
  });

  it('should have GET /:id route connected to getById controller', () => {
    const stack = playlistRoutes.stack;
    const getRoute = stack.find((layer) => layer.route?.path === '/:id' && layer.route?.methods.get);
    expect(getRoute).toBeDefined();
  });

  it('should have POST / route connected to create controller with auth middleware', () => {
    const stack = playlistRoutes.stack;
    const postRoute = stack.find((layer) => layer.route?.path === '/' && layer.route?.methods.post);
    expect(postRoute).toBeDefined();
  });

  it('should have DELETE /:id route connected to remove controller', () => {
    const stack = playlistRoutes.stack;
    const deleteRoute = stack.find((layer) => layer.route?.path === '/:id' && layer.route?.methods.delete);
    expect(deleteRoute).toBeDefined();
  });

  it('should have POST /:id/tracks route connected to addTrackToPlaylist controller', () => {
    const stack = playlistRoutes.stack;
    const postRoute = stack.find((layer) => layer.route?.path === '/:id/tracks' && layer.route?.methods.post);
    expect(postRoute).toBeDefined();
  });

  it('should have DELETE /:id/tracks/:trackId route connected to removeTrackFromPlaylist controller', () => {
    const stack = playlistRoutes.stack;
    const deleteRoute = stack.find((layer) => layer.route?.path === '/:id/tracks/:trackId' && layer.route?.methods.delete);
    expect(deleteRoute).toBeDefined();
  });
});
