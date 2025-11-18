import { pageManager } from "./pageManager.js"

const app = document.getElementById("app");

async function init() {
  const url = window.location.pathname;
  const params = new URLSearchParams(window.location.search);

  pageManager(app, url, params);
}

init();