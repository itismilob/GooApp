export default function formatTag(tag: number | undefined) {
  if (tag != undefined) return '#' + tag.toString().padStart(4, '0');
  return '#';
}
