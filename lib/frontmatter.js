// const matter = require('gray-matter');d
// helps us safely stringigy the frontmatter as a json object
// const stringifyObject = require('stringify-object');
// helps us in getting the reading time for a given text
// const readingTime = require('reading-time');

const stringifyObject = require('stringify-object');
const matter = require('gray-matter');
const readingTime = require('reading-time');

// import matter from 'gray-matter';
// import stringifyObject from 'stringify-object';
// import readingTime from 'reading-time';

// please make sure you have installed these dependencies
// before proceeding further, or remove the require statements
// that you don't use

/**
 * This is a plugin for remark in mdx.
 * This should be a function that may take some options and
 * should return a function with the following signature
 * @param tree - the MDXAST
 * @param file - the file node
 * @return void - it should mutate the tree if needed
 */

module.exports = (tree, file) => {
  // export default () => (tree, file) => {
  // we will get the frontMatter using `gray-matter`
  const {data: frontMatter, content} = matter(file.contents);
  // the frontMatter holds the json object of the frontmatter
  // the content holds the text of markdown except frontmatter

  // we can do whatever we want with the frontmatter
  // like, adding the time to read, formatting the date to display,
  // adding a short description using the content
  const {text} = readingTime(content);
  frontMatter.timeToRead = text;

  // finally we will add a `export` node to the tree
  tree.children.push({
    type: 'export',
    value: `export const frontMatter = ${stringifyObject(frontMatter)}`,
  });
  // now `frontMatter` will be available to use in our codebase
  // we essentically changed the frontmatter of yml form to a
  // constant and exported it

  // now we need to remove the frontmatter from the tree
  // because it has already been processed by mdx and nodes
  // have beed created for it assuming it was a markdown content
  //
  // remove the thematicBreak "<hr />" to first heading
  // --- => thematicBreak
  // title: this
  // date: 2020-12-12 => becomes heading
  // ---
  if (tree.children[0].type === 'thematicBreak') {
    const firstHeadingIndex = tree.children.findIndex(
      t => t.type === 'heading'
    );
    if (firstHeadingIndex !== -1) {
      // we will mutate the tree.children by removing these nodes
      tree.children.splice(0, firstHeadingIndex + 1);
    }
  }
};
