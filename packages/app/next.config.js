const withTM = require('next-transpile-modules')([
  '@shopify/types',
  '@shopify/core',
  '@shopify/components',
]);

module.exports = withTM({
  images: {
    domains: ['m.media-amazon.com'],
  },
});
