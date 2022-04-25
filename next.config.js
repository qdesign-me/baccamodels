module.exports = {
  env: {
    HOST: process.env.HOST,
  },
  async rewrites() {
    return [
      {
        source: '/admin/:country/events/new',
        destination: '/admin/:country/events/edit/new', // Matched parameters can be used in the destination
      },
      {
        source: '/admin/users/new',
        destination: '/admin/users/edit/new', // Matched parameters can be used in the destination
      },

      {
        source: '/admin/:country/models/new',
        destination: '/admin/:country/models/edit/new', // Matched parameters can be used in the destination
      },
    ];
  },
};
