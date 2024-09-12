import Cookies from 'universal-cookie'
import { parse as parseCookie } from 'cookie-es'

const CONSENT_KEY = 'cookie-accepted'

export default defineNuxtPlugin({
    name: 'cookies',
    setup() {
        const cookieManager = new Cookies(null, {path: '/', expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)})

        const cookies = {
            getCookieValue(key: string) {
                if (import.meta.server) {
                    const req = useRequestHeaders()
                    return parseCookie(req.cookie)[key] ?? undefined
                }

                return cookieManager.get(key)
            },

            get(key: string) {
                const cookieValue = this.getCookieValue(key)

                try {
                    return JSON.parse(cookieValue)
                } catch {
                    return cookieValue
                }
            },

            set(key: string, value: any) {
                let cookieValue = value

                if (typeof value === 'object') {
                    cookieValue = JSON.stringify(value)
                }

                cookieManager.set(key, cookieValue)
            },
        }

        return { provide: { cookies } }
    },
})
