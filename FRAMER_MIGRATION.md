# Macxfolio migration brief

## Product thesis

This portfolio presents Haonan Li as an AI data operator who can turn ambiguous business questions into structured data work and then use AI tools to ship working digital products

The primary audience is recruiters hiring for AI operations data operations local services ecommerce operations and AI product adjacent roles

The single job of the site is to make the visitor understand Haonan's professional value within one minute and then give them clear proof through cases process and build history

## Design direction

- Keep the template macOS desktop system window motion dock responsiveness and glass treatment
- Remove unrelated agency projects games and decorative apps
- Use the desktop as a professional operating system rather than a collection of random portfolio links
- Keep the wallpaper cool blue and quiet so app icons and project windows remain the focus
- Use system sans for interface copy and a compact mono face only for data labels statuses and build evidence
- Use the Build Log app as the signature element because it exposes the real Codex Git and iteration process behind the portfolio

## Desktop application map

| Template area | New app name | Purpose | Existing source |
| --- | --- | --- | --- |
| About Me | Profile | Personal positioning current role education and strengths | `src/components/PortfolioDesk.tsx` `AboutContent` |
| Resume | Resume | ByteDance experience smart agriculture masters and capability summary | `src/components/PortfolioDesk.tsx` `ResumeContent` |
| Main project app | Signal Lab | AI data operations case and quality loop | `src/components/PortfolioDesk.tsx` `workCards.ai` |
| Project app | City Lens | Local services data operations case and context map | `src/components/PortfolioDesk.tsx` `workCards.local` |
| Project app | Market Flow | Ecommerce operations case and growth path | `src/components/PortfolioDesk.tsx` `workCards.commerce` |
| Project app | Field Notes | Smart agriculture and AI research perspective | `src/components/PortfolioDesk.tsx` `workCards.agriculture` |
| Project app | Build Log | Codex workflow React implementation Git evidence and before after story | `src/components/PortfolioDesk.tsx` `BuildContent` |
| Photos or Finder | Personal Atlas | Photography food music film games and daily life collections | `src/components/PersonalAtlas.tsx` |
| Contact | Connect | WeChat GitHub and professional contact card | `src/components/PortfolioDesk.tsx` `ContactContent` |
| Resources | Source | GitHub repository tools and selected references | `src/components/PortfolioDesk.tsx` `GithubContent` and `src/components/SkillsSection.tsx` |

## Core copy

### Profile

Haonan Li

AI Data Operator and Vibe Builder

在复杂信息里找到结构

把业务问题转化成可执行的数据工作

再用 AI 和代码让想法变成真实产品

### Professional summary

目前在字节跳动参与 AI 数据运营 本地生活数据运营和电商运营

智慧农业硕士研究生背景让我保留对 AI 数据和真实场景之间关系的系统视角

### Build Log

这个网站本身就是作品

使用 Codex 参与需求梳理 内容架构 视觉设计 React 开发 浏览器测试和 Git 版本管理

基于 Framer Macxfolio 模板完成二次设计 内容系统重构和交互定制

### Contact

从一次真实的交流开始

如果你也关注 AI 数据业务和产品创造欢迎认识我

## Local assets

- Portrait `src/assets/avatar-3d.png`
- WeChat QR `src/assets/wechat-qr.jpg`
- Personal photography `src/assets/photo-*.jpg`
- Daily life `src/assets/daily-*.jpg`
- Food collection `src/assets/food/`
- Film collection `src/assets/films/`
- Music collection `src/assets/artists/`
- Game collection `src/assets/game-*.jpg`
- Current generated wallpaper `src/assets/macos-fluid-wallpaper.png`

## Migration order

1 Duplicate the free template into the Framer workspace
2 Rename the project and preserve an untouched duplicate as a rollback point
3 Replace the desktop app taxonomy and remove irrelevant template content
4 Migrate Profile Resume and Connect first so the site is immediately usable
5 Build the four professional case apps from one reusable case detail system
6 Migrate Personal Atlas collections and selectively use the strongest images
7 Add Build Log and Source as proof of Vibe Coding work
8 Test desktop tablet and mobile breakpoints
9 Publish to a temporary Framer domain for review
10 Connect the final custom domain only after approval

## Progress snapshot

Updated 2026 08 19

- Free Macxfolio copy is active in the Framer workspace
- Owner identity is Haonan Li across the responsive home variants
- Desktop apps are renamed to Profile Resume Signal Lab City Lens Market Flow Field Notes Build Log Personal Atlas Source and Toolkit
- Main navigation is Profile Work Atlas Build and Connect
- GitHub is the only verified external shortcut
- Profile contains the AI Data Operator and Vibe Builder positioning and the three real operations capability areas
- Fictional email phone number Brooklyn map client names and other template identity leftovers are removed
- Connect contains the bilingual introduction GitHub and the real WeChat QR image on desktop and mobile
- Works CMS contains seven records with truthful categories and summaries
- Personal Atlas uses `src/assets/daily-2.jpg` as its cover and four approved daily images in the detail record
- Template client names challenges and final thoughts are replaced across all seven Works records
- Framer Agent free credits are exhausted but manual editing preview and publishing remain available
- No publish action has been taken

## Next manual pass

1 Replace remaining template project thumbnails with restrained custom covers
2 Verify every app window from the interactive preview
3 Check tablet and phone spacing and overflow
4 Publish to a temporary Framer domain only after explicit approval
