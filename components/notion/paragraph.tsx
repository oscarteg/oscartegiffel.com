// case 'paragraph':
//   return `<p>${child.paragraph.text
//     .map(text => renderRichText(text))
//     .join('')}</p>`;
// case 'to_do':
//   return `<div><label class="inline-flex items-center">
//               <input readonly disabled type="checkbox" class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500" ${
//                 child.to_do.checked ? 'checked' : ''
//               }>
//               <span class="ml-2">${child.to_do.text[0].plain_text}</span>
//             </label></div>`;
// case 'image':
//   if (child.image.type === 'external') {
//     return `<img src="${child.image.external.url}" />`;
//   } else {
//     return `<img src="${child.image.file.url}" />`;
//   }

export default function Paragraph() {
  return null;
}
