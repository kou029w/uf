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

const source = f => {
  return new ReadableStream({
    pull: async controller => {
      return controller.enqueue(await f());
    }
  });
};
const stream = f => {
  // chrome
  return new TransformStream({
    transform: async (chunk, controller) =>
      controller.enqueue(await f(await chunk))
  });
};
const renderer = element =>
  new WritableStream({
    async write(chunk) {
      render(chunk, element);
    }
  });
const now = () => {
  let started = false;
  return async () => {
    if (started) await new Promise(resolve => setTimeout(resolve, 1000));
    started = true;
    return `現在時刻は${new Date().toLocaleString()}です。`;
  };
};
const template = async date => html`
  <style>
    @import "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css";
  </style>
  <article class="markdown-body">
    <h1>${document.title}</h1>
    <p>
      <code>main.js</code>は<a href=${import.meta.url}
        ><code>${import.meta.url}</code></a
      >に存在します。
    </p>
    <p>
      ${date}
    </p>
  </article>
`;
// chrome 59+
source(now())
  .pipeThrough(stream(template))
  .pipeTo(renderer(document.body));
