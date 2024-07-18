export function svgTextEllipsis(text: string, width: number) {
  let i = 0;
  let len = 0;
  for (; i < text.length; i++) {
    len += text.charCodeAt(i) > 255 ? 2 : 1;
    if (len > width) break;
  }
  return text.slice(0, i) + (i < text.length ? '…' : '');
}
