

export const STORAGE_KEY_COLOR = 'color';
export const STORAGE_KEY_NAME = 'name';
export const STORAGE_KEY_BTC_ADDR = 'btcAddr';

export const readStorage = (key, def = '') => {
  const item = localStorage.getItem(key);
  if (item === null) return def;
  return item;
};

export const writeStorage = (key, value) => {
  localStorage.setItem(key, value);
};
