/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/raves',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
