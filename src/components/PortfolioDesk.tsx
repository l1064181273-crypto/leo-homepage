import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  BatteryMedium,
  Bot,
  BriefcaseBusiness,
  Check,
  Code2,
  Command,
  FileText,
  FolderOpen,
  Image,
  Sparkles,
  UserRound,
  Wifi,
} from "lucide-react";
import { type CSSProperties, type ElementType, useEffect, useMemo, useRef, useState } from "react";

type MacApp = "about" | "work" | "ai" | "resume" | "build" | "photos";

type AppDefinition = {
  id: MacApp;
  label: string;
  icon: ElementType;
  tone: string;
  x: string;
  y: string;
};

const apps: AppDefinition[] = [
  { id: "about", label: "About Me", icon: UserRound, tone: "orange", x: "7%", y: "15%" },
  { id: "work", label: "Work", icon: BriefcaseBusiness, tone: "blue", x: "34%", y: "12%" },
  { id: "ai", label: "AI Data", icon: Bot, tone: "violet", x: "72%", y: "15%" },
  { id: "resume", label: "Resume", icon: FileText, tone: "yellow", x: "13%", y: "59%" },
  { id: "build", label: "Vibe Build", icon: Code2, tone: "cyan", x: "59%", y: "55%" },
  { id: "photos", label: "Life Archive", icon: Image, tone: "green", x: "82%", y: "61%" },
];

const dockApps: MacApp[] = ["about", "work", "ai", "build", "photos"];

const appMap = Object.fromEntries(apps.map((app) => [app.id, app])) as Record<MacApp, AppDefinition>;

const AboutContent = () => (
  <div className="mac-about">
    <div className="mac-avatar">HL</div>
    <div>
      <p className="mac-window-eyebrow">PROFILE</p>
      <h4>Haonan Li</h4>
      <p>AI 数据运营者与 Vibe Coding 实践者</p>
    </div>
    <div className="mac-chip-row">
      <span>AI Data</span><span>Local Life</span><span>E-commerce</span>
    </div>
  </div>
);

const WorkContent = () => (
  <div className="mac-app-stack">
    <div className="mac-content-heading">
      <div><p className="mac-window-eyebrow">OPERATIONS</p><h4>把问题变成行动</h4></div>
      <span className="mac-status-badge">Active</span>
    </div>
    {[
      ["Signal", "找到业务变化与关键问题"],
      ["Context", "补齐用户场景与业务背景"],
      ["Action", "形成可以推进的下一步"],
    ].map(([title, text], index) => (
      <div className="mac-list-row" key={title}>
        <span>0{index + 1}</span><div><strong>{title}</strong><p>{text}</p></div><Check size={13} />
      </div>
    ))}
  </div>
);

const AIContent = () => (
  <div className="mac-app-stack">
    <div className="mac-content-heading">
      <div><p className="mac-window-eyebrow">AI DATA LOOP</p><h4>让标准持续学习</h4></div>
      <Bot size={22} />
    </div>
    <div className="mac-pipeline">
      <div><span>01</span><strong>Define</strong><p>拆解模糊需求</p></div>
      <i />
      <div><span>02</span><strong>Review</strong><p>识别质量偏差</p></div>
      <i />
      <div><span>03</span><strong>Loop</strong><p>反馈推动迭代</p></div>
    </div>
    <div className="mac-quality-line"><span>Quality feedback</span><b><i /></b><strong>Learning</strong></div>
  </div>
);

const ResumeContent = () => (
  <div className="mac-app-stack">
    <div className="mac-content-heading">
      <div><p className="mac-window-eyebrow">RESUME</p><h4>经历与背景</h4></div>
      <FileText size={22} />
    </div>
    <div className="mac-resume-line">
      <span>NOW</span><div><strong>ByteDance</strong><p>AI 数据运营 · 本地生活 · 电商运营</p></div>
    </div>
    <div className="mac-resume-line">
      <span>EDU</span><div><strong>智慧农业硕士研究生</strong><p>AI · 数据意识 · 系统思维</p></div>
    </div>
  </div>
);

const BuildContent = () => (
  <div className="mac-build">
    <div className="mac-content-heading">
      <div><p className="mac-window-eyebrow">VIBE CODING</p><h4>leo-homepage</h4></div>
      <Code2 size={22} />
    </div>
    <div className="mac-terminal">
      <p><span>→</span> frame the idea</p>
      <p><span>→</span> build with codex</p>
      <p><span>→</span> test in browser</p>
      <p className="terminal-success"><Check size={12} /> preview ready on localhost</p>
    </div>
  </div>
);

const PhotosContent = () => (
  <div className="mac-app-stack">
    <div className="mac-content-heading">
      <div><p className="mac-window-eyebrow">LIFE ARCHIVE</p><h4>工作之外的我</h4></div>
      <Image size={22} />
    </div>
    <div className="mac-photo-grid">
      <span className="photo-tile-one">摄影</span>
      <span className="photo-tile-two">音乐</span>
      <span className="photo-tile-three">日常</span>
    </div>
    <a className="mac-open-link" href="/photos">打开生活档案 <FolderOpen size={13} /></a>
  </div>
);

const contentByApp: Record<MacApp, () => JSX.Element> = {
  about: AboutContent,
  work: WorkContent,
  ai: AIContent,
  resume: ResumeContent,
  build: BuildContent,
  photos: PhotosContent,
};

const PortfolioDesk = () => {
  const [activeApp, setActiveApp] = useState<MacApp | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [time, setTime] = useState(() => new Date());
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(time), [time]);

  const openApp = (id: MacApp) => {
    setActiveApp(id);
    setIsMinimized(false);
  };

  const closeApp = () => {
    setActiveApp(null);
    setIsMinimized(false);
    setIsMaximized(false);
  };

  const ActiveContent = activeApp ? contentByApp[activeApp] : null;
  const activeDefinition = activeApp ? appMap[activeApp] : null;

  return (
    <div className="portfolio-desk mac-desktop" ref={desktopRef} aria-label="可交互的 Haonan OS 桌面">
      <div className="mac-wallpaper" aria-hidden="true"><i /><i /><i /></div>

      <div className="mac-menubar">
        <div><span className="mac-menu-logo"><Command size={11} /></span><strong>Haonan OS</strong><span>Portfolio</span><span>View</span></div>
        <div><Wifi size={12} /><BatteryMedium size={14} /><time>{formattedTime}</time></div>
      </div>

      <div className="mac-desktop-icons" aria-label="桌面应用">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <motion.button
              type="button"
              className="mac-desktop-app"
              style={{ "--app-x": app.x, "--app-y": app.y } as CSSProperties}
              key={app.id}
              onClick={() => openApp(app.id)}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              aria-label={`打开 ${app.label}`}
            >
              <span className={`mac-app-icon tone-${app.tone}`}><Icon size={26} /></span>
              <span className="mac-app-label">{app.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeApp && !isMinimized && ActiveContent && activeDefinition && (
          <motion.div
            className={`mac-window ${isMaximized ? "is-maximized" : ""}`}
            key={activeApp}
            initial={{ opacity: 0, scale: 0.88, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.86, y: 28 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            drag={!isMaximized}
            dragConstraints={desktopRef}
            dragMomentum={false}
          >
            <div className="mac-window-titlebar">
              <div className="mac-traffic-lights">
                <button type="button" className="mac-close" onClick={closeApp} aria-label="关闭窗口" />
                <button type="button" className="mac-minimize" onClick={() => setIsMinimized(true)} aria-label="最小化窗口" />
                <button type="button" className="mac-maximize" onClick={() => setIsMaximized((value) => !value)} aria-label="最大化窗口" />
              </div>
              <span>{activeDefinition.label}</span>
              <span className="mac-drag-hint">drag</span>
            </div>
            <div className="mac-window-body"><ActiveContent /></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMinimized && activeDefinition && (
          <motion.button
            type="button"
            className="mac-minimized-pill"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            onClick={() => setIsMinimized(false)}
          >
            {activeDefinition.label} 已最小化
          </motion.button>
        )}
      </AnimatePresence>

      {!activeApp && <div className="mac-desktop-tip"><Sparkles size={12} />点击桌面图标打开应用</div>}

      <div className="mac-dock" role="toolbar" aria-label="应用程序坞">
        {dockApps.map((id) => {
          const app = appMap[id];
          const Icon = app.icon;
          const isOpen = activeApp === id;
          return (
            <button type="button" key={id} onClick={() => openApp(id)} aria-label={`从程序坞打开 ${app.label}`}>
              <span className={`mac-dock-icon tone-${app.tone}`}><Icon size={22} /></span>
              {isOpen && <i className="dock-open-dot" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioDesk;
