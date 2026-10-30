import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  experimental: { cpus: 2 },
};

export default config;
