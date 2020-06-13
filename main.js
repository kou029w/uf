import {
  html,
  render as litRender,
} from "https://unpkg.com/lit-html@1.1.2/lit-html.js?module";
import "https://cdn.jsdelivr.net/npm/markdown-it@11.0.0/dist/markdown-it.min.js";
const head = () => html`
  <title>uf</title>
  <meta name="viewport" content="width=device-width" />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
  />
`;
const body = ({ date, readme }) => html`
  <main>
    ${readme}
    <section>
      <h2>JavaScriptによって書き込まれているセクション</h2>
      <p>
        <a href=${import.meta.url}>${import.meta.url}</a>
        によって描画されています。
      </p>
      <p>
        現在時刻は${date}です。
      </p>
    </section>
  </main>
`;
async function fetchReadme() {
  const res = await fetch("README.md");
  const text = await res.text();
  return html([window.markdownit().render(text)]);
}
function render(state) {
  Object.assign(document.documentElement, { lang: "ja", dir: "ltr" });
  litRender(head(), document.head);
  litRender(body(state), document.body);
}
async function main() {
  const state = {
    readme: undefined,
    date: new Date().toLocaleString(),
  };
  setInterval(() => {
    state.date = new Date().toLocaleString();
    render(state);
  }, 1e3);
  render(state);
  state.readme = await fetchReadme();
  render(state);
}
main();
