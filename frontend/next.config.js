/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    publicRuntimeConfig: {
        apiUrl: process.env.NEXT_PUBLIC_API_URL,
    }
}

module.exports = nextConfig
