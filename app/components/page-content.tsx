type Props = { html: string };

export function PageContent({ html }: Props) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
