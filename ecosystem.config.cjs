module.exports = {
    apps: [
        {
            name: "pm2-remo",
            port: "3019",
            script: "./.output/server/index.mjs",
            exec_mode: 'cluster',
            instances: 'max',
            env: {
                MODE: "production"
            }
        }
    ]
}
