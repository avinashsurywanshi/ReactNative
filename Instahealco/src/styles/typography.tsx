import { Platform } from 'react-native'
import { scaleFont } from './mixins'

// FONT FAMILY
export const font_family = Platform.OS === 'android' ? 'Roboto' : 'Avenir'

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400'
export const FONT_WEIGHT_BOLD = '700'

// FONT SIZE
export const FONT_SIZE_18 = scaleFont(18)
export const FONT_SIZE_16 = scaleFont(16)
export const FONT_SIZE_14 = scaleFont(14)
export const FONT_SIZE_12 = scaleFont(12)
export const FONT_SIZE_10 = scaleFont(10)
export const FONT_SIZE_8 = scaleFont(8)

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24)
export const LINE_HEIGHT_20 = scaleFont(20)
export const LINE_HEIGHT_16 = scaleFont(16)

// FONT STYLE
export const FONT_REGULAR = {
  fontWeight: FONT_WEIGHT_REGULAR,
}

export const FONT_BOLD = {
  fontWeight: FONT_WEIGHT_BOLD,
}
