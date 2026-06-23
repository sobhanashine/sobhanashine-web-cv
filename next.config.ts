import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — there's another lockfile higher up in the home dir,
  // and Turbopack otherwise guesses the wrong root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
