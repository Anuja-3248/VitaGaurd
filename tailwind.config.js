/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                    700: '#7e22ce',
                    800: '#6b21a8',
                    900: '#581c87',
                },
                dark: {
                    bg: '#0a0a0a',     /* Neutral 950 - Faint Black */
                    card: '#171717',   /* Neutral 900 - Lighter Black */
                    border: '#262626', /* Neutral 800 */
                    accent: '#3b82f6', /* Brighter blue for contrast */
                },
                health: {
                    indigo: '#6366f1',
                    violet: '#8b5cf6',
                    cyber: '#22d3ee',
                    emerald: '#10b981',
                    rose: '#f43f5e',
                    amber: '#f59e0b',
                },
                surface: {
                    glass: 'rgba(255, 255, 255, 0.7)',
                    card: '#ffffff',
                    bg: '#f8fafc',
                }
            },
            boxShadow: {
                'premium': '0 10px 40px -10px rgba(0, 0, 0, 0.05)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'glow': '0 0 20px rgba(147, 51, 234, 0.25)',
                'sticker': '4px 4px 0px 0px rgba(15, 23, 42, 0.05)',
                'sticker-dark': '4px 4px 0px 0px rgba(255, 255, 255, 0.05)',
                'cartoon': '0 8px 30px rgba(0, 0, 0, 0.12)',
                'cartoon-dark': '0 8px 30px rgba(255, 255, 255, 0.03)',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 15px rgba(147, 51, 234, 0.2)' },
                    '50%': { boxShadow: '0 0 30px rgba(147, 51, 234, 0.45)' },
                }
            }
        },
    },
    plugins: [
        forms,
        typography,
    ],
}
