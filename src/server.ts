// muxair.com has moved to muxairdigital.com.
//
// Every request (apex and www, any path, any query string) gets a single permanent 301 to the
// same path on the new domain, so rankings and links carry over. One hop, no chains.
// Keep this live for at least 6-12 months; do not block or remove the old domain, Google needs
// to crawl it to see the redirects. The previous server entry is in git history (e960bd7).

const NEW_ORIGIN = "https://muxairdigital.com";

function redirectToNewDomain(req: Request): Response {
  const { pathname, search } = new URL(req.url);
  return Response.redirect(`${NEW_ORIGIN}${pathname}${search}`, 301);
}

export default {
  fetch(request: Request) {
    return redirectToNewDomain(request);
  },
};
