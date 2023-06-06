export function getServerURL(path = "") {
  const server = "https://production-moneypie.up.railway.app";
  return `${server}${path}`;
}
