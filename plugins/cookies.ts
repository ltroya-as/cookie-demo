import Cookies from 'js-cookie'
import { parse as parseCookie } from 'cookie-es'

const CONSENT_KEY = 'cookie-accepted'

export default defineNuxtPlugin({
    name: 'cookies',

    setup() {
        const DEFAULT_COOKIE_OPTIONS = {path: '/', expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}

        const cookies = {
            getCookieValue(key: string) {
                if (import.meta.server) {
                    const req = useRequestHeaders()
                    return parseCookie(req.cookie || "")[key] ?? undefined
                }

                // return Cookies.get(key)
            },

            get(key: string) {
                const cookieValue = this.getCookieValue(key)

                try {
                    return JSON.parse(cookieValue || "")
                } catch {
                    return cookieValue
                }
            },

            set(key: string, value: any) {
                let cookieValue = value

                if (typeof value === 'object') {
                    cookieValue = JSON.stringify(value)
                }

                Cookies.set(key, cookieValue, DEFAULT_COOKIE_OPTIONS)
            },
        }

        return { provide: { cookies } }
    },
})
