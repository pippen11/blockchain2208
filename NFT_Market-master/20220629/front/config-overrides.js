const { override } = require('customize-cra')

module.exports = override(config => {
    config.resolve = {
        fallback: {
            ...config.resolve.fallback,
            https: require.resolve('https-browserify'),
        },
    }
    return config
})
