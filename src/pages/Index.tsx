import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Boxes,
  CheckCircle2,
  Code2,
  Github,
  LineChart,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import PortfolioDesk from "@/components/PortfolioDesk";

const capabilities = [
  {
    icon: Bot,
    label: "AI Data Operations",
    title: "把模型需求翻译成可执行的数据标准",
    description: "关注数据质量、规则边界与反馈闭环，让生产流程更清晰，也让问题更容易被定位。",
    meta: "QUALITY / WORKFLOW / FEEDBACK",
  },
  {
    icon: LineChart,
    label: "Local Services",
    title: "从指标变化回到真实业务现场",
    description: "结合用户、供给与场景理解问题，不只描述发生了什么，也继续追问为什么与下一步。",
    meta: "INSIGHT / CONTEXT / ACTION",
  },
  {
    icon: ShoppingBag,
    label: "E-commerce",
    title: "在内容、商品与转化之间寻找连接",
    description: "用运营视角拆解链路，在复杂信息里找到更清晰的优先级与推进路径。",
    meta: "CONTENT / PRODUCT / GROWTH",
  },
  {
    icon: Code2,
    label: "Vibe Coding",
    title: "让想法快速成为能被体验的产品",
    description: "从需求梳理、界面设计到开发上线，用 AI 协作完成真实、可交互、可迭代的作品。",
    meta: "BRIEF / BUILD / SHIP",
  },
];

const workflow = [
  { step: "Observe", copy: "找到值得解决的问题，而不是急着做页面。" },
  { step: "Structure", copy: "把背景、目标和限制整理成清晰的系统。" },
  { step: "Operate", copy: "把方案推进到可以验证的真实结果。" },
  { step: "Iterate", copy: "根据反馈继续修改，直到表达足够准确。" },
];

const Index = () => {
  const scrollToDesk = () => {
    document.getElementById("desk")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="portfolio-page" id="top">
      <header className="portfolio-nav">
        <a className="portfolio-wordmark" href="#top" aria-label="返回顶部">
          <span>HL</span>
          <span className="wordmark-copy">
            <strong>Haonan Li</strong>
            <small>AI data operator &amp; builder</small>
          </span>
        </a>
        <nav aria-label="主页导航">
          <a href="#work">工作</a>
          <a href="#story">经历</a>
          <a href="#build">作品</a>
          <a className="nav-contact" href="#contact">联系我 <ArrowUpRight size={13} /></a>
        </nav>
      </header>

      <main>
        <section className="portfolio-hero">
          <div className="hero-copy">
            <motion.div
              className="hero-status"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <span className="status-pulse" />Portfolio / 2026
            </motion.div>

            <motion.p
              className="hero-kicker"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
            >
              AI DATA OPERATIONS · LOCAL SERVICES · E-COMMERCE
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              让数据工作，
              <span>也让想法上线。</span>
            </motion.h1>

            <motion.p
              className="hero-intro"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              我是 Haonan Li，目前在字节跳动从事 AI 数据运营、本地生活数据运营和电商运营。
              我关心复杂系统如何被理解、执行与持续改进，也在用 Vibe Coding 把自己的想法变成产品。
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              <a className="primary-action" href="#work">查看我的工作 <ArrowDownRight size={17} /></a>
              <button className="secondary-action" type="button" onClick={scrollToDesk}>
                体验工作台 <Boxes size={16} />
              </button>
            </motion.div>

            <motion.div
              className="hero-footnote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42 }}
            >
              <span><MapPin size={13} /> China</span>
              <span>Built with Codex + React</span>
            </motion.div>
          </div>

          <motion.div
            className="hero-desk-wrap"
            id="desk"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="desk-note"><span>INTERACTIVE</span>点击底部图标切换工作模式</div>
            <PortfolioDesk />
          </motion.div>
        </section>

        <section className="portfolio-section work-section" id="work">
          <div className="section-heading">
            <div><p className="section-kicker">WHAT I BRING</p><h2>一套跨越数据、业务与产品的工作方式</h2></div>
            <p>不把自己限制在一个岗位名称里。我的优势是理解上下文、建立结构，并把事情推到可以验证的状态。</p>
          </div>

          <div className="capability-grid">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  className="capability-card"
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <div className="capability-topline"><span className="capability-icon"><Icon size={19} /></span><span>0{index + 1}</span></div>
                  <p className="capability-label">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p className="capability-description">{item.description}</p>
                  <p className="capability-meta">{item.meta}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="portfolio-section story-section" id="story">
          <div className="story-lead">
            <p className="section-kicker">MY CONTEXT</p>
            <h2>专业起点，<br />不是职业终点。</h2>
            <p>智慧农业训练了我理解传感器、数据与真实场景之间的关系；运营工作让我继续学习，如何让数据最终服务于判断和行动。</p>
          </div>

          <div className="story-timeline">
            <article className="timeline-card is-current">
              <div className="timeline-marker"><span /></div>
              <div className="timeline-content">
                <div className="timeline-meta"><span>NOW</span><span>ByteDance</span></div>
                <h3>AI 数据运营 · 本地生活数据运营 · 电商运营</h3>
                <p>在不同业务语境中处理数据、流程与协作问题，持续积累从发现问题到推动解决的运营经验。</p>
                <div className="timeline-tags"><span>Data quality</span><span>Business context</span><span>Cross-team</span></div>
              </div>
            </article>

            <article className="timeline-card">
              <div className="timeline-marker"><span /></div>
              <div className="timeline-content">
                <div className="timeline-meta"><span>ACADEMIC</span><span>Master&apos;s degree</span></div>
                <h3>智慧农业硕士研究生</h3>
                <p>保留农业与 AI 的交叉视角，但不把职业方向限定在农业。更重要的收获，是系统思维、数据意识与跨学科学习能力。</p>
                <div className="timeline-tags"><span>Smart agriculture</span><span>AI</span><span>Systems thinking</span></div>
              </div>
            </article>
          </div>
        </section>

        <section className="portfolio-section build-section" id="build">
          <div className="build-panel">
            <div className="build-copy">
              <p className="section-kicker">VIBE CODING CASE / 01</p>
              <h2>这个网站，本身就是作品。</h2>
              <p>我用 Codex 参与信息架构、视觉方向、React 开发、交互测试和版本管理。它不只是一个简历容器，也是在展示我如何与 AI 协作完成真实交付。</p>
              <a href="https://github.com/l1064181273-crypto/leo-homepage" target="_blank" rel="noreferrer">
                查看 GitHub 仓库 <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="workflow-list" aria-label="网站制作流程">
              {workflow.map((item, index) => (
                <div className="workflow-row" key={item.step}>
                  <span>0{index + 1}</span><strong>{item.step}</strong><p>{item.copy}</p><CheckCircle2 size={17} />
                </div>
              ))}
            </div>
          </div>

          <div className="build-stack">
            <span>React</span><span>TypeScript</span><span>Vite</span><span>Framer Motion</span><span>Codex</span><span>Git</span>
          </div>
        </section>

        <section className="portfolio-contact" id="contact">
          <div><p className="section-kicker">LET&apos;S CONNECT</p><h2>如果你也在关注 AI、数据与真实业务，欢迎认识我。</h2></div>
          <div className="contact-actions">
            <a href="https://github.com/l1064181273-crypto" target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={14} /></a>
            <Link to="/friend">查看联系方式 <ArrowUpRight size={14} /></Link>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <span>© 2026 Haonan Li</span>
        <span>Designed as an AI data operator&apos;s workspace.</span>
        <div><Link to="/photos">生活档案</Link><a href="#top">回到顶部 ↑</a></div>
      </footer>
    </div>
  );
};

export default Index;
