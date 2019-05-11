import { html, render } from "https://unpkg.com/lit-html?module";

Object.assign(document.documentElement, {
  lang: "ja",
  dir: "ltr"
});

render(
  html`
    <title>main.jsによって書き込まれているページ</title>
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <link rel="icon" href="#" />
  `,
  document.head
);

setInterval(() => {
  render(
    html`
      <h1>${document.title}</h1>
      <p>
        <code>main.js</code>は<a href=${import.meta.url}
          ><code>${import.meta.url}</code></a
        >に存在します。
      </p>
      <p>
        現在時刻は${new Date().toLocaleString()}です。
      </p>
    `,
    document.body
  );
});
