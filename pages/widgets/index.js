import DefaultLayout from '@/layouts/default';
import { getWidgets } from '@/lib/widgets';

export default function Widgets({ widgets }) {
  return (
    <DefaultLayout
      title={'Widgets'}
      excerpt={'A collection of widgets I created for Notion.so'}
    >
      <ul>
        {widgets.map((widget) => (
          <li key={widget.name}>
            <a href={widget.route}>{widget.name}</a>
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
}

export async function getStaticProps() {
  const widgets = await getWidgets();
  console.log(widgets);

  return { props: { widgets } };
}
