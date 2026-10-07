export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function isExternalHref(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href);
}
