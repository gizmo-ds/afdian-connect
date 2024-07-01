import { homepage } from '../package.json';

export default eventHandler(async e => {
  await sendRedirect(e, homepage, 301);
});
