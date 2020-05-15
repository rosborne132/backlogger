const dotenv = require('dotenv')

dotenv.config()

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
    env: {
        API_KEY: process.env.API_KEY
    },
    target: 'serverless'
})
