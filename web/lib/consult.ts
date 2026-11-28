/**
 * 相談窓口の見出し。表示はこのオブジェクトだけを変えます。
 */
export const CONSULT_CLAIMS = {
  badgeJa: "外国人材・実習生のみなさまへ",
  badgeEn: "To Foreign Talents and Interns",
  pillJa: "年中無休・24時間対応",
  pillEn: "OPEN 24/7",
  titlePrefix: "24時間365日対応",
  titleAccent: "相談窓口",
  hotlineEn: "24/7 MULTILINGUAL CONSULTATION HOTLINE",
  leadJa: "実習生の安心な日本生活を、母国語スタッフがサポートします。",
  leadEn: "Staff who speak your language support your life in Japan.",
} as const;

export const CONSULT_LANGUAGES = [
  { ja: "ベトナム語", en: "VIETNAMESE", flag: "/flags/vietnam.svg", width: 72, height: 48 },
  { ja: "インドネシア語", en: "INDONESIAN", flag: "/flags/indonesia.svg", width: 72, height: 48 },
  { ja: "タガログ語", en: "TAGALOG", flag: "/flags/philippines.svg", width: 96, height: 48 },
] as const;
