import { html, render } from "https://unpkg.com/lit-html?module";

Object.entries({
  lang: "ja",
  dir: "ltr"
}).forEach(([k, v]) => {
  document.documentElement[k] = v;
});

document.title = "main.jsによって書き込まれているページ";

render(
  html`
    <h1>${document.title}</h1>
    <p>
      <code>main.js</code>は<a href=${import.meta.url}
        ><code>${import.meta.url}</code></a
      >に存在します。
    </p>
  `,
  document.body
);
