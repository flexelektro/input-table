module.exports = function(eleventyConfig) {

  eleventyConfig.setTemplateFormats([
    "md",
    "css" // css is not yet a recognized template extension in Eleventy
  ]);

  // Add a filter using the Config API
  //eleventyConfig.addFilter( "myFilter", function() {});
  eleventyConfig.addLayoutAlias('post', '_includes/layout.njk');
  // You can return your Config object (optional).
  return {
    dir: {
      input: "docs/src",
      output:"docs/dist"
    },
    watch:true,

  };
};
