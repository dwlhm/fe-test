export const get = (name: string) => {
  "use client";

  if (!document.cookie) return undefined;
  const raw = document.cookie.split(";").find((item) => item.includes(name));

  if (!raw) return undefined;

  const parse = raw.split("=");

  if (parse.length < 1) return undefined;
  return parse[1].replaceAll("%22", "");
};
