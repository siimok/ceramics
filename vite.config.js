import { readdirSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Every *.html file in the project root is a page, so new pages are built automatically.
const pages = Object.fromEntries(
    readdirSync(__dirname)
        .filter((file) => file.endsWith('.html'))
        .map((file) => [basename(file, '.html'), resolve(__dirname, file)]),
)

const navLinks = [
    ['index', 'Avaleht'],
    ['tooted', 'Tooted'],
    ['hinnakiri', 'Hinnakiri'],
    ['galerii', 'Galerii'],
    ['meist', 'Meist'],
    ['kontakt', 'Kontakt'],
]

const EMAIL = 'info@ahjupotitoostus.ee'

function renderNav(currentPage) {
    const links = navLinks
        .map(([page, label]) => {
            const active = page === currentPage ? ' class="active-link" aria-current="page"' : ''
            return `<a${active} href="./${page}.html">${label}</a>`
        })
        .join('\n')

    return `<nav>
    <div class="container hide-mobile d-lg-block">
        <a href="./index.html">
            <div class="logo">Ahjupotitööstus OÜ</div>
        </a>
        ${links}
    </div>

    <div class="container hide-desktop">
        <button id="hamburger-button" aria-label="Menüü" aria-expanded="false" aria-controls="mobile-menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30" height="30" aria-hidden="true">
                <rect x="8" y="12" width="32" height="4" rx="2"/>
                <rect x="8" y="22" width="32" height="4" rx="2"/>
                <rect x="8" y="32" width="32" height="4" rx="2"/>
            </svg>
        </button>
        <div id="mobile-menu" class="hide-desktop">
            ${links}
        </div>
    </div>
</nav>`
}

function renderFooter() {
    return `<footer>
    <div class="container">
        <p>© ${new Date().getFullYear()} OÜ Ahjupotitööstus</p>
        <p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
        <p>Registrikood: 10836981</p>
    </div>
</footer>`
}

// Replaces <!-- site-nav --> and <!-- site-footer --> in every page (dev and build).
function siteLayout() {
    return {
        name: 'site-layout',
        transformIndexHtml: {
            order: 'pre',
            handler(html, ctx) {
                const page = basename(ctx.filename, '.html')
                return html
                    .replace('<!-- site-nav -->', renderNav(page))
                    .replace('<!-- site-footer -->', renderFooter())
            },
        },
    }
}

export default defineConfig({
    base: '/ceramics/',   // only if deploying to domain.com/ceramics/
    plugins: [siteLayout()],
    build: {
        rollupOptions: {
            input: pages,
        },
    },
})
