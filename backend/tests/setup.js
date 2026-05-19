// tests/setup.js
process.env.JWT_SECRET = 'test_secret_key';

jest.mock('../prismaClient', () => ({
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
  },
  track: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
  playlist: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
  playlistTrack: {
    create: jest.fn(),
    delete: jest.fn(),
  },
  favourite: {
    findMany: jest.fn(),
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  artist: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
  album: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
}));
