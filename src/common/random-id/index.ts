export const randomID = (): string => `_${(Number(String(Math.random()).slice(2)) + Date.now()).toString(36)}`;
