const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const dotenv = require('dotenv')

dotenv.config()

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})

module.exports = phase => {
    switch (phase) {
        case PHASE_DEVELOPMENT_SERVER:
            return withBundleAnalyzer({
                // environment varibales for local development
                env: {
                    API_KEY: process.env.API_KEY,
                    IDP_DOMAIN:
                        'backlogger-dev.auth.us-west-2.amazoncognito.com',
                    USER_POOL_ID: 'us-west-2_hyvMtcwns',
                    USER_POOL_CLIENT_ID: '7qusn3cgm9eu9bogliq8pm060m',
                    REDIRECT_SIGN_IN: 'http://localhost:3000/token',
                    REDIRECT_SIGN_OUT: 'http://localhost:3000/',
                    AUTH_COOKIE_DOMAIN: 'localhost'
                },
                target: 'serverless'
            })
        default:
            return withBundleAnalyzer({
                // environment varibales for production
                env: {
                    IDP_DOMAIN: 'prod',
                    USER_POOL_ID: 'prod',
                    USER_POOL_CLIENT_ID: 'prod',
                    REDIRECT_SIGN_IN: 'prod',
                    REDIRECT_SIGN_OUT: 'prod',
                    AUTH_COOKIE_DOMAIN: 'prod'
                },
                target: 'serverless'
            })
    }
}
