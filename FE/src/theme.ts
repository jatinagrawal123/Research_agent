import { alpha, createTheme } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material'

/* ── Dark tokens ────────────────────────────────────────────── */
const CYAN   = '#00e5ff'
const VIOLET = '#8b5cf6'
const DARK_BG = '#040c18'

/* ── Light tokens ───────────────────────────────────────────── */
const TEAL   = '#0b6e69'
const ORANGE = '#c7682f'
const LIGHT_BG = '#f3ede2'

/* Shared typography (mode-independent) */
const typography = {
  fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
  h1: {
    fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
    fontWeight: 800,
    fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
    lineHeight: 1.02,
    letterSpacing: '-0.04em',
  },
  h2: { fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.03em' },
  h3: { fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.2, letterSpacing: '-0.02em' },
  h4: { fontWeight: 700, letterSpacing: '-0.03em' },
  h5: { fontWeight: 700, letterSpacing: '-0.02em' },
  h6: { fontWeight: 600 },
  subtitle1: { fontSize: '1.05rem', lineHeight: 1.7 },
  body1:     { fontSize: '1rem', lineHeight: 1.8 },
  button:    { fontWeight: 700, letterSpacing: '0.02em', textTransform: 'none' as const },
}

export function createAppTheme(mode: PaletteMode) {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: isDark
        ? { main: CYAN,  dark: '#00b8d4', light: '#67f3ff', contrastText: DARK_BG }
        : { main: TEAL,  dark: '#064e4a', light: '#5fd2c7', contrastText: '#ffffff' },
      secondary: isDark
        ? { main: VIOLET, dark: '#6d28d9', light: '#c4b5fd' }
        : { main: ORANGE, dark: '#8f4316', light: '#f0b083' },
      success: { main: isDark ? '#00e676' : '#1b8a4a' },
      background: {
        default: isDark ? DARK_BG : LIGHT_BG,
        paper:   isDark ? 'rgba(6, 18, 40, 0.80)' : 'rgba(255, 251, 245, 0.88)',
      },
      text: {
        primary:   isDark ? '#dff0ff' : '#132321',
        secondary: isDark ? '#6899b8' : '#53615f',
      },
      divider: isDark ? alpha(CYAN, 0.14) : alpha('#1d3a36', 0.12),
    },
    shape: { borderRadius: 18 },
    typography,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': { colorScheme: mode },
          body: {
            minHeight: '100vh',
            backgroundColor: isDark ? DARK_BG : LIGHT_BG,
            backgroundImage: isDark
              ? [
                  `radial-gradient(ellipse 70% 40% at 15% 8%, ${alpha(CYAN, 0.07)} 0%, transparent 60%)`,
                  `radial-gradient(ellipse 60% 50% at 85% 90%, ${alpha(VIOLET, 0.09)} 0%, transparent 55%)`,
                ].join(',')
              : [
                  `radial-gradient(ellipse 70% 40% at 15% 8%, ${alpha(TEAL, 0.09)} 0%, transparent 60%)`,
                  `radial-gradient(ellipse 60% 50% at 85% 90%, ${alpha(ORANGE, 0.09)} 0%, transparent 55%)`,
                  'linear-gradient(180deg, #f6f1e8 0%, #efe7d7 46%, #e7dcc7 100%)',
                ].join(','),
            backgroundAttachment: 'fixed',
          },
          '::-webkit-scrollbar':       { width: 6 },
          '::-webkit-scrollbar-track': { background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)' },
          '::-webkit-scrollbar-thumb': {
            background: isDark ? alpha(CYAN, 0.25) : alpha(TEAL, 0.28),
            borderRadius: 99,
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: isDark ? alpha(CYAN, 0.45) : alpha(TEAL, 0.48),
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: isDark
            ? {
                backgroundImage: 'none',
                background: 'rgba(6, 18, 40, 0.80)',
                border: `1px solid ${alpha(CYAN, 0.11)}`,
                boxShadow: `0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 ${alpha(CYAN, 0.07)}`,
                backdropFilter: 'blur(22px)',
              }
            : {
                backgroundImage: 'none',
                background: 'rgba(255, 251, 245, 0.88)',
                border: `1px solid ${alpha(TEAL, 0.12)}`,
                boxShadow: '0 8px 40px rgba(19,35,33,0.09)',
                backdropFilter: 'blur(18px)',
              },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999, paddingInline: 22, paddingBlock: 12 },
          containedPrimary: isDark
            ? {
                background: `linear-gradient(135deg, ${CYAN} 0%, #0099cc 100%)`,
                color: DARK_BG,
                fontWeight: 800,
                boxShadow: `0 0 22px ${alpha(CYAN, 0.35)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, #33eeff 0%, ${CYAN} 100%)`,
                  boxShadow: `0 0 36px ${alpha(CYAN, 0.55)}`,
                },
                '&.Mui-disabled': { opacity: 0.45 },
              }
            : {
                background: `linear-gradient(135deg, ${TEAL} 0%, #085754 100%)`,
                color: '#ffffff',
                fontWeight: 800,
                boxShadow: `0 4px 18px ${alpha(TEAL, 0.32)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, #0e8a84 0%, ${TEAL} 100%)`,
                  boxShadow: `0 6px 28px ${alpha(TEAL, 0.45)}`,
                },
                '&.Mui-disabled': { opacity: 0.45 },
              },
          outlinedPrimary: isDark
            ? {
                borderColor: alpha(CYAN, 0.4),
                '&:hover': { borderColor: CYAN, background: alpha(CYAN, 0.06), boxShadow: `0 0 16px ${alpha(CYAN, 0.2)}` },
              }
            : {
                borderColor: alpha(TEAL, 0.4),
                '&:hover': { borderColor: TEAL, background: alpha(TEAL, 0.06) },
              },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 999, fontWeight: 700, letterSpacing: '0.02em' },
          colorPrimary: isDark
            ? { background: alpha(CYAN, 0.12),   color: CYAN,   border: `1px solid ${alpha(CYAN, 0.3)}` }
            : { background: alpha(TEAL, 0.10),   color: TEAL,   border: `1px solid ${alpha(TEAL, 0.28)}` },
          colorSecondary: isDark
            ? { background: alpha(VIOLET, 0.12), color: '#c4b5fd', border: `1px solid ${alpha(VIOLET, 0.3)}` }
            : { background: alpha(ORANGE, 0.10), color: ORANGE,    border: `1px solid ${alpha(ORANGE, 0.28)}` },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: isDark
            ? {
                backgroundColor: alpha(CYAN, 0.025),
                '& fieldset': { borderColor: alpha(CYAN, 0.18) },
                '&:hover fieldset': { borderColor: alpha(CYAN, 0.38) },
                '&.Mui-focused fieldset': { borderColor: CYAN, boxShadow: `0 0 0 3px ${alpha(CYAN, 0.12)}` },
              }
            : {
                backgroundColor: 'rgba(255,252,247,0.85)',
                '& fieldset': { borderColor: alpha(TEAL, 0.22) },
                '&:hover fieldset': { borderColor: alpha(TEAL, 0.44) },
                '&.Mui-focused fieldset': { borderColor: TEAL, boxShadow: `0 0 0 3px ${alpha(TEAL, 0.10)}` },
              },
          input: { color: isDark ? '#dff0ff' : '#132321' },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root:    { color: isDark ? alpha('#dff0ff', 0.55) : alpha('#132321', 0.55) },
          focused: { color: isDark ? `${CYAN} !important` : `${TEAL} !important` },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: { color: isDark ? alpha('#dff0ff', 0.38) : alpha('#132321', 0.45) },
        },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: isDark ? alpha(CYAN, 0.1) : alpha(TEAL, 0.12) } },
      },
      MuiAccordion: {
        styleOverrides: {
          root: isDark
            ? { background: 'rgba(6, 18, 40, 0.80)', border: `1px solid ${alpha(CYAN, 0.11)}`, backdropFilter: 'blur(22px)' }
            : { background: 'rgba(255,251,245,0.88)', border: `1px solid ${alpha(TEAL, 0.12)}`, backdropFilter: 'blur(18px)' },
        },
      },
      MuiLink: {
        styleOverrides: { root: { color: isDark ? CYAN : TEAL } },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            background: isDark ? 'rgba(6, 18, 40, 0.90)' : 'rgba(255,248,240,0.95)',
            border: `1px solid rgba(255,80,80,0.28)`,
          },
        },
      },
    },
  })
}


