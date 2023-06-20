module.exports = {
  apps: [
    {
      name: "rpn-express",
      script: "./src/server.js",
      watch: ["src", ".env", "package.json", "package-lock.json"],
      watch_delay: 250,
      ignore_watch: ["node_modules"],
      exp_backoff_restart_delay: 100,
      restart_delay: 5000,
    },
  ],
};
