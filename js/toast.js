let timer = null;

export function showToast(message) {
  const node = document.getElementById("toast");
  if (!node) return;
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => node.classList.remove("show"), 2600);
}
