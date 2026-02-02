if ("serviceWorker" in navigator") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/inpsvitale/sw.js", {
      scope: "/inpsvitale/"
    });
  });
}
