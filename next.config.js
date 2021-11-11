module.exports = {
  env: {
    HOSTNAME: process.env.HOSTNAME,
  },
  async rewrites() {
    return [
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
