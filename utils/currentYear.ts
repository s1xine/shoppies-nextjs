import { cacheLife } from "next/cache";

export async function currentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}
