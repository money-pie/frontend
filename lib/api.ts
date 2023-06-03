export function getServerURL(path = "") {
  return `${process.env.SERVER_URL || "http://localhost:5000"}${path}`;
}
