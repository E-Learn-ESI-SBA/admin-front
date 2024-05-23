/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "github.com",
                port: "",
                pathname: "/*",
                protocol: "https",
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: "",
                pathname: "/v0/b/madaurus-71e46.appspot.com/o/**",
            },
        ],
    },
};

export default nextConfig;
