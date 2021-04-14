const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
    require('dotenv').config();
}

const config = {
    isDev: isDev,
    port: process.env.PORT || 5000,
}

module.exports = config;