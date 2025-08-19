module.exports = {
  apps: [
    {
      name: 'GooApp',
      script: 'build/app.js',
      instance: 'max',
      autorestart: true,
      watch: false,
    },
  ],
};
