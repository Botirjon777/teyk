import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.119"],
};

export default withNextIntl(nextConfig);
