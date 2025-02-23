import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
},
images: {
  remotePatterns: [
      {
          protocol: "https",
          hostname: "utfs.io",
          port: "",
          pathname: "/f/**"
      },
      {
        protocol: "https",
        hostname: "bfqn9qc0iy.ufs.sh",
        port: "",
        pathname: "/f/**",
      },
  ]
}
};

export default nextConfig;
