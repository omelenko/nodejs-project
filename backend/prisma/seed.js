const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // --- USERS ---
  const passwordHash = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'abel@example.com' },
    update: {},
    create: {
      username: 'theweeknd_fan',
      email: 'abel@example.com',
      password: passwordHash,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'kendrick@example.com' },
    update: {},
    create: {
      username: 'kdot_listener',
      email: 'kendrick@example.com',
      password: passwordHash,
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'billie@example.com' },
    update: {},
    create: {
      username: 'billieish',
      email: 'billie@example.com',
      password: passwordHash,
    },
  });

  const user4 = await prisma.user.upsert({
    where: { email: 'drake@example.com' },
    update: {},
    create: {
      username: 'drizzy_drake',
      email: 'drake@example.com',
      password: passwordHash,
    },
  });

  const user5 = await prisma.user.upsert({
    where: { email: 'sza@example.com' },
    update: {},
    create: {
      username: 'sza_ctrl',
      email: 'sza@example.com',
      password: passwordHash,
    },
  });

  console.log('Users created:', user1.username, user2.username, user3.username);

  // --- ARTISTS ---
  const artist1 = await prisma.artist.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      stageName: 'The Weeknd',
      firstName: 'Abel',
      lastName: 'Tesfaye',
      bio: 'Canadian singer, songwriter, and record producer known for his sonic versatility and dark themes.',
      country: 'Canada',
      avatarUrl: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb',
      isVerified: true,
      userId: user1.id,
    },
  });

  const artist2 = await prisma.artist.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      stageName: 'Kendrick Lamar',
      firstName: 'Kendrick',
      lastName: 'Lamar',
      bio: 'Pulitzer Prize-winning rapper from Compton, California. One of the most influential artists of his generation.',
      country: 'USA',
      avatarUrl: 'https://i.scdn.co/image/ab6761610000e5eb437b9e2a82505b3d93ff1022',
      isVerified: true,
      userId: user2.id,
    },
  });

  const artist3 = await prisma.artist.upsert({
    where: { userId: user3.id },
    update: {},
    create: {
      stageName: 'Billie Eilish',
      firstName: 'Billie',
      lastName: 'Eilish',
      bio: 'Grammy-winning pop artist known for her whisper-pop style and dark, introspective lyrics.',
      country: 'USA',
      avatarUrl: 'https://i.scdn.co/image/ab6761610000e5eb4c4b9e1b5c2c5e5b5c2c5e5b',
      isVerified: true,
      userId: user3.id,
    },
  });

  const artist4 = await prisma.artist.upsert({
    where: { userId: user4.id },
    update: {},
    create: {
      stageName: 'Drake',
      firstName: 'Aubrey',
      lastName: 'Graham',
      bio: 'Canadian rapper, singer, and entrepreneur. Founder of OVO Sound.',
      country: 'Canada',
      avatarUrl: 'https://i.scdn.co/image/ab6761610000e5ebe8c0cbf9e70980873d3da0f4',
      isVerified: true,
      userId: user4.id,
    },
  });

  const artist5 = await prisma.artist.upsert({
    where: { userId: user5.id },
    update: {},
    create: {
      stageName: 'SZA',
      firstName: 'Solána',
      lastName: 'Rowe',
      bio: 'R&B singer-songwriter from St. Louis. Known for her introspective style blending R&B, neo-soul and pop.',
      country: 'USA',
      isVerified: true,
      userId: user5.id,
    },
  });

  console.log('Artists created:', artist1.stageName, artist2.stageName, artist3.stageName);

  // --- ALBUMS ---
  const album1 = await prisma.album.create({
    data: {
      title: 'After Hours',
      coverUrl: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
      releaseYear: 2020,
      artists: {
        create: [{ artist: { connect: { id: artist1.id } } }],
      },
    },
  });

  const album2 = await prisma.album.create({
    data: {
      title: 'To Pimp a Butterfly',
      coverUrl: 'https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1',
      releaseYear: 2015,
      artists: {
        create: [{ artist: { connect: { id: artist2.id } } }],
      },
    },
  });

  const album3 = await prisma.album.create({
    data: {
      title: 'When We All Fall Asleep, Where Do We Go?',
      coverUrl: 'https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce',
      releaseYear: 2019,
      artists: {
        create: [{ artist: { connect: { id: artist3.id } } }],
      },
    },
  });

  const album4 = await prisma.album.create({
    data: {
      title: 'Scorpion',
      coverUrl: 'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5',
      releaseYear: 2018,
      artists: {
        create: [{ artist: { connect: { id: artist4.id } } }],
      },
    },
  });

  const album5 = await prisma.album.create({
    data: {
      title: 'SOS',
      coverUrl: 'https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44',
      releaseYear: 2022,
      artists: {
        create: [{ artist: { connect: { id: artist5.id } } }],
      },
    },
  });

  console.log('Albums created:', album1.title, album2.title, album3.title);

  // --- TRACKS ---
  const tracks = await Promise.all([
    // After Hours — The Weeknd
    prisma.track.create({
      data: {
        title: 'Blinding Lights',
        genre: 'Synth-pop',
        duration: 200,
        fileUrl: 'https://audio.example.com/blinding-lights.mp3',
        albumId: album1.id,
        artists: { create: [{ artist: { connect: { id: artist1.id } } }] },
      },
    }),
    prisma.track.create({
      data: {
        title: 'After Hours',
        genre: 'R&B',
        duration: 361,
        fileUrl: 'https://audio.example.com/after-hours.mp3',
        albumId: album1.id,
        artists: { create: [{ artist: { connect: { id: artist1.id } } }] },
      },
    }),
    prisma.track.create({
      data: {
        title: 'Save Your Tears',
        genre: 'Synth-pop',
        duration: 215,
        fileUrl: 'https://audio.example.com/save-your-tears.mp3',
        albumId: album1.id,
        artists: { create: [{ artist: { connect: { id: artist1.id } } }] },
      },
    }),

    // To Pimp a Butterfly — Kendrick Lamar
    prisma.track.create({
      data: {
        title: 'Alright',
        genre: 'Hip-Hop',
        duration: 219,
        fileUrl: 'https://audio.example.com/alright.mp3',
        albumId: album2.id,
        artists: { create: [{ artist: { connect: { id: artist2.id } } }] },
      },
    }),
    prisma.track.create({
      data: {
        title: 'King Kunta',
        genre: 'Hip-Hop',
        duration: 234,
        fileUrl: 'https://audio.example.com/king-kunta.mp3',
        albumId: album2.id,
        artists: { create: [{ artist: { connect: { id: artist2.id } } }] },
      },
    }),
    prisma.track.create({
      data: {
        title: "These Walls",
        genre: 'Hip-Hop',
        duration: 302,
        fileUrl: 'https://audio.example.com/these-walls.mp3',
        albumId: album2.id,
        artists: { create: [{ artist: { connect: { id: artist2.id } } }] },
      },
    }),

    // Billie Eilish
    prisma.track.create({
      data: {
        title: 'bad guy',
        genre: 'Electropop',
        duration: 194,
        fileUrl: 'https://audio.example.com/bad-guy.mp3',
        albumId: album3.id,
        artists: { create: [{ artist: { connect: { id: artist3.id } } }] },
      },
    }),
    prisma.track.create({
      data: {
        title: 'bury a friend',
        genre: 'Electropop',
        duration: 193,
        fileUrl: 'https://audio.example.com/bury-a-friend.mp3',
        albumId: album3.id,
        artists: { create: [{ artist: { connect: { id: artist3.id } } }] },
      },
    }),

    // Drake
    prisma.track.create({
      data: {
        title: "God's Plan",
        genre: 'Hip-Hop',
        duration: 198,
        fileUrl: 'https://audio.example.com/gods-plan.mp3',
        albumId: album4.id,
        artists: { create: [{ artist: { connect: { id: artist4.id } } }] },
      },
    }),
    prisma.track.create({
      data: {
        title: 'In My Feelings',
        genre: 'Hip-Hop',
        duration: 217,
        fileUrl: 'https://audio.example.com/in-my-feelings.mp3',
        albumId: album4.id,
        artists: { create: [{ artist: { connect: { id: artist4.id } } }] },
      },
    }),

    // SZA
    prisma.track.create({
      data: {
        title: 'Kill Bill',
        genre: 'R&B',
        duration: 153,
        fileUrl: 'https://audio.example.com/kill-bill.mp3',
        albumId: album5.id,
        artists: { create: [{ artist: { connect: { id: artist5.id } } }] },
      },
    }),
    prisma.track.create({
      data: {
        title: 'Shirt',
        genre: 'R&B',
        duration: 209,
        fileUrl: 'https://audio.example.com/shirt.mp3',
        albumId: album5.id,
        artists: { create: [{ artist: { connect: { id: artist5.id } } }] },
      },
    }),

    // Collab: The Weeknd & Drake (single, no album)
    prisma.track.create({
      data: {
        title: 'Crew Love',
        genre: 'R&B',
        duration: 258,
        fileUrl: 'https://audio.example.com/crew-love.mp3',
        artists: {
          create: [
            { artist: { connect: { id: artist1.id } } },
            { artist: { connect: { id: artist4.id } } },
          ],
        },
      },
    }),
  ]);

  console.log(`Tracks created: ${tracks.length}`);

  // --- PLAYLISTS ---
  const playlist1 = await prisma.playlist.create({
    data: {
      name: 'Late Night Vibes',
      creatorId: user1.id,
      tracks: {
        create: [
          { track: { connect: { id: tracks[0].id } } },
          { track: { connect: { id: tracks[1].id } } },
          { track: { connect: { id: tracks[2].id } } },
          { track: { connect: { id: tracks[10].id } } },
          { track: { connect: { id: tracks[12].id } } },
        ],
      },
    },
  });

  const playlist2 = await prisma.playlist.create({
    data: {
      name: 'Hip-Hop Essentials',
      creatorId: user2.id,
      tracks: {
        create: [
          { track: { connect: { id: tracks[3].id } } },
          { track: { connect: { id: tracks[4].id } } },
          { track: { connect: { id: tracks[5].id } } },
          { track: { connect: { id: tracks[8].id } } },
          { track: { connect: { id: tracks[9].id } } },
        ],
      },
    },
  });

  const playlist3 = await prisma.playlist.create({
    data: {
      name: 'Chill R&B',
      creatorId: user5.id,
      tracks: {
        create: [
          { track: { connect: { id: tracks[1].id } } },
          { track: { connect: { id: tracks[10].id } } },
          { track: { connect: { id: tracks[11].id } } },
          { track: { connect: { id: tracks[12].id } } },
        ],
      },
    },
  });

  console.log('Playlists created:', playlist1.name, playlist2.name, playlist3.name);

  // --- FAVOURITES ---
  await prisma.favourite.createMany({
    data: [
      { userId: user1.id, trackId: tracks[0].id },
      { userId: user1.id, trackId: tracks[1].id },
      { userId: user2.id, trackId: tracks[3].id },
      { userId: user2.id, trackId: tracks[4].id },
      { userId: user3.id, trackId: tracks[6].id },
      { userId: user3.id, trackId: tracks[7].id },
      { userId: user4.id, trackId: tracks[8].id },
      { userId: user5.id, trackId: tracks[10].id },
      { userId: user5.id, trackId: tracks[11].id },
    ],
    skipDuplicates: true,
  });

  console.log('Favourites added.');
  console.log('\nSeed completed successfully!');
  console.log(`  Users:     5`);
  console.log(`  Artists:   5`);
  console.log(`  Albums:    5`);
  console.log(`  Tracks:    ${tracks.length}`);
  console.log(`  Playlists: 3`);
  console.log(`  Favourites: 9`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
