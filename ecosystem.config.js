module.exports = {
    apps: [
      {
        name: 'users-api',
        script: './dist/app.js',
        watch: true,
        ignore_watch: ["node_modules", "dist"],
        watch_options: {
          "followSymlinks": false
        },
        env: {
          NODE_ENV: 'development',
          PORT: 3000
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 3000
        }
      }
    ]
  };
  