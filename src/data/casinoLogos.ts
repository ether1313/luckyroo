const LOGOS_DIR = 'casino-logos';
const BONUS_LOGOS_DIR = 'casino-bonuses-logos';
const DEFAULT_EXT = '.png';

export const CASINO_LOGO_KEYS = [
  'ipay9', 'kingbet9', 'bigpay77', 'me99', 'rolex9', 'gucci9', 'pkm9',
  'mrbean9', 'micky9', 'winnie777', 'bybid9', 'queen13', 'ace96au', 'mrboom9',
] as const;

export type CasinoLogoKey = (typeof CASINO_LOGO_KEYS)[number];

/** Top Rated Casinos 专用：public/casino-logos/ */
export function getLogoUrl(logoKey: string, ext: string = DEFAULT_EXT): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${LOGOS_DIR}/${logoKey}${ext}`;
}

/** Casino Bonuses Section 专用：public/casino-bonuses-logos/（与 Top Rated 各自用各自的素材） */
export function getBonusLogoUrl(logoKey: string, ext: string = DEFAULT_EXT): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${BONUS_LOGOS_DIR}/${logoKey}${ext}`;
}

export function getBonusLogoUrlByName(casinoName: string): string {
  const key = casinoLogoKey[casinoName] ?? casinoName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  return getBonusLogoUrl(key);
}

/** 品牌 slug -> 显示名称 */
export const casinoDisplayName: Record<string, string> = {
  ipay9: 'iPay9',
  kingbet9: 'Kingbet9',
  bigpay77: 'Bigpay77',
  me99: 'Me99',
  rolex9: 'Rolex9',
  gucci9: 'Gucci9',
  pkm9: 'PKM9',
  mrbean9: 'MrBean9',
  micky9: 'Micky9',
  winnie777: 'Winnie777',
  bybid9: 'Bybid9',
  queen13: 'Queen13',
  ace96au: 'Ace96au',
  mrboom9: 'MrBoom9',
};

/** 按品牌显示名称或 slug 映射到 logo 文件名 */
export const casinoLogoKey: Record<string, string> = {
  'iPay9': 'ipay9',
  'Kingbet9': 'kingbet9',
  'Bigpay77': 'bigpay77',
  'Me99': 'me99',
  'Rolex9': 'rolex9',
  'Gucci9': 'gucci9',
  'PKM9': 'pkm9',
  'MrBean9': 'mrbean9',
  'Micky9': 'micky9',
  'Winnie777': 'winnie777',
  'Bybid9': 'bybid9',
  'Queen13': 'queen13',
  'Ace96au': 'ace96au',
  'MrBoom9': 'mrboom9',
  'MRBOOM9': 'mrboom9',
  // slugs
  ipay9: 'ipay9',
  kingbet9: 'kingbet9',
  bigpay77: 'bigpay77',
  me99: 'me99',
  rolex9: 'rolex9',
  gucci9: 'gucci9',
  pkm9: 'pkm9',
  mrbean9: 'mrbean9',
  micky9: 'micky9',
  winnie777: 'winnie777',
  bybid9: 'bybid9',
  queen13: 'queen13',
  ace96au: 'ace96au',
  mrboom9: 'mrboom9',
};

export function getLogoUrlByName(casinoName: string): string {
  const key = casinoLogoKey[casinoName] ?? casinoName.toLowerCase().replace(/\s+/g, '');
  return getLogoUrl(key);
}
