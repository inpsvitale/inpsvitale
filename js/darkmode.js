export function initDarkMode() {
  const btn = document.getElementById("darkToggle");
  if (!btn) return;

  if (localStorage.getItem("dark") === "1")
    document.body.classList.add("dark");

  btn.onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("dark",
      document.body.classList.contains("dark") ? "1" : "0");
  };
}
