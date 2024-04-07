/** @type {import('next').NextConfig} */
const nextConfig = {}

const withVercelToolbar = require("@vercel/toolbar/plugins/next")()
const withNextIntl = require("next-intl/plugin")("./src/i18n.ts")

// Instead of module.exports = nextConfig, do this:
module.exports = withVercelToolbar(withNextIntl(nextConfig))
