/**
 * 字体系列名称常量及 Expo asset 映射
 *
 * 用法：
 *   import { FontFamily } from '@/constants/fonts'
 *   fontFamily: FontFamily.InterRegular
 */

export const FontFamily = {
  // Inika — 标题 / 装饰
  InikaRegular: 'Inika-Regular',
  InikaBold: 'Inika-Bold',

  // Inter 18pt — 正文 / UI
  InterThin: 'Inter-Thin',
  InterRegular: 'Inter-Regular',
  InterMedium: 'Inter-Medium',
  InterBold: 'Inter-Bold',

  // League Spartan — 数字 / 强调
  LeagueSpartanThin: 'LeagueSpartan-Thin',
  LeagueSpartanRegular: 'LeagueSpartan-Regular',
  LeagueSpartanMedium: 'LeagueSpartan-Medium',
  LeagueSpartanBold: 'LeagueSpartan-Bold',

  // Poppins — 按钮 / 标签
  PoppinsThin: 'Poppins-Thin',
  PoppinsRegular: 'Poppins-Regular',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsBold: 'Poppins-Bold',

  // Quattrocento Sans — 说明文字
  QuattrocentoSansRegular: 'QuattrocentoSans-Regular',
  QuattrocentoSansBold: 'QuattrocentoSans-Bold',
  QuattrocentoSansItalic: 'QuattrocentoSans-Italic',
  QuattrocentoSansBoldItalic: 'QuattrocentoSans-BoldItalic',
} as const;

export type FontFamilyName = (typeof FontFamily)[keyof typeof FontFamily];

/** 传入 useFonts() 的 asset 映射 */
export const fontAssets = {
  [FontFamily.InikaRegular]: require('../assets/fonts/Inika-Regular.ttf'),
  [FontFamily.InikaBold]: require('../assets/fonts/Inika-Bold.ttf'),

  [FontFamily.InterThin]: require('../assets/fonts/Inter_18pt-Thin.ttf'),
  [FontFamily.InterRegular]: require('../assets/fonts/Inter_18pt-Regular.ttf'),
  [FontFamily.InterMedium]: require('../assets/fonts/Inter_18pt-Medium.ttf'),
  [FontFamily.InterBold]: require('../assets/fonts/Inter_18pt-Bold.ttf'),

  [FontFamily.LeagueSpartanThin]: require('../assets/fonts/LeagueSpartan-Thin.ttf'),
  [FontFamily.LeagueSpartanRegular]: require('../assets/fonts/LeagueSpartan-Regular.ttf'),
  [FontFamily.LeagueSpartanMedium]: require('../assets/fonts/LeagueSpartan-Medium.ttf'),
  [FontFamily.LeagueSpartanBold]: require('../assets/fonts/LeagueSpartan-Bold.ttf'),

  [FontFamily.PoppinsThin]: require('../assets/fonts/Poppins-Thin.ttf'),
  [FontFamily.PoppinsRegular]: require('../assets/fonts/Poppins-Regular.ttf'),
  [FontFamily.PoppinsMedium]: require('../assets/fonts/Poppins-Medium.ttf'),
  [FontFamily.PoppinsBold]: require('../assets/fonts/Poppins-Bold.ttf'),

  [FontFamily.QuattrocentoSansRegular]: require('../assets/fonts/QuattrocentoSans-Regular.ttf'),
  [FontFamily.QuattrocentoSansBold]: require('../assets/fonts/QuattrocentoSans-Bold.ttf'),
  [FontFamily.QuattrocentoSansItalic]: require('../assets/fonts/QuattrocentoSans-Italic.ttf'),
  [FontFamily.QuattrocentoSansBoldItalic]: require('../assets/fonts/QuattrocentoSans-BoldItalic.ttf'),
};
