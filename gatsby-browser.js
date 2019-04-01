/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// When service werker is updated, reload the new information
exports.onServiceWorkerUpdateFound = () => {
  window.location.reload()
}
