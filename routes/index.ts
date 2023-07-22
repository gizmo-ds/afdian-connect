import * as pkg from '@/package.json';

export default eventHandler(async e => {
  await sendRedirect(e, pkg.homepage, 301);
});
