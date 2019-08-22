import {
  html,
  render as litRender
} from "https://unpkg.com/lit-html@1.1.2/lit-html.js?module";
import "https://cdnjs.cloudflare.com/ajax/libs/markdown-it/9.1.0/markdown-it.min.js";
const { url } = import.meta;
const lang = "ja";
const dir = "ltr";
const head = () => html`
  <title>uf</title>
  <meta name="viewport" content="width=device-width" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css"
  />
`;
const jsLink = html`
  <a href=${url}>${url}</a>
`;
const body = ({ date, readme }) => html`
  <main class="markdown-body">
    ${readme}
    <section>
      <h2>JavaScriptによって書き込まれているセクション</h2>
      <p>${jsLink}によって描画されています。</p>
      <p>
        現在時刻は${date}です。
      </p>
    </section>
  </main>
`;
const md = window.markdownit();
const fetchReadme = async () => {
  const res = await fetch("README.md");
  const text = await res.text();
  return html([md.render(text)]);
};
const state = {
  readme: undefined,
  date: new Date().toLocaleString()
};
const render = () => {
  Object.assign(document.documentElement, { lang, dir });
  litRender(head(), document.head);
  litRender(body(state), document.body);
};
fetchReadme().then(html => {
  state.readme = html;
  render();
});
setInterval(() => {
  state.date = new Date().toLocaleString();
  render();
}, 1e3);
render();
