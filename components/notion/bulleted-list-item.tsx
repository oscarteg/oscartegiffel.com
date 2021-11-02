// case 'bulleted_list_item':
//   return `${
//     previousElement === undefined ||
//     previousElement.type !== 'bulleted_list_item'
//       ? '<ul>'
//       : ''
//   }<li>${child.bulleted_list_item.text
//     .map(text => renderRichText(text))
//     .join('')}</li>${
//     nextElement === undefined || nextElement.type !== 'bulleted_list_item'
//       ? '</ul>'
//       : ''
//   }`;

export default function BulletedListItem() {
  return null;
}
