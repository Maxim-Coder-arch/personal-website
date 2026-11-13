const GUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

export const resolvePageLabel = (path: string, titles?: Map<string, string>) => {
  if (path === "/") return "Главная";

  const match = path.match(GUID);

  if (match && titles) {
    const title = titles.get(match[0].toLowerCase());
    
    if (title) return title;
  }
  return path;
};