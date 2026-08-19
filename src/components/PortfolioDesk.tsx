import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Bot, Check, Code2, MousePointer2, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type DeskView = "ops" | "ai" | "build";

const views: Record<DeskView, {
  title: string;
  kicker: string;
  icon: typeof BarChart3;
  tone: string;
  items: Array<{ label: string; detail: string; status: string }>;
}> = {
  ops: {
    title: "把问题整理成行动",
    kicker: "LOCAL LIFE · E-COMMERCE",
    icon: BarChart3,
    tone: "blue",
    items: [
      { label: "Signal", detail: "定位变化与关键问题", status: "identified" },
      { label: "Context", detail: "补齐业务与用户背景", status: "aligned" },
      { label: "Action", detail: "形成清晰的执行建议", status: "ready" },
    ],
  },
  ai: {
    title: "让数据标准可执行",
    kicker: "QUALITY · FEEDBACK · ITERATION",
    icon: Bot,
    tone: "green",
    items: [
      { label: "Define", detail: "把模糊需求拆成标准", status: "scoped" },
      { label: "Review", detail: "发现质量偏差与边界", status: "checked" },
      { label: "Loop", detail: "沉淀反馈并推动迭代", status: "learning" },
    ],
  },
  build: {
    title: "把想法快速做出来",
    kicker: "BRIEF · PROTOTYPE · SHIP",
    icon: Code2,
    tone: "amber",
    items: [
      { label: "Frame", detail: "先明确页面的单一任务", status: "clear" },
      { label: "Build", detail: "用 Codex 完成可用原型", status: "running" },
      { label: "Polish", detail: "在浏览器里持续验证", status: "shipping" },
    ],
  },
};

const dockItems: Array<{ id: DeskView; label: string; icon: typeof BarChart3 }> = [
  { id: "ops", label: "Ops", icon: BarChart3 },
  { id: "ai", label: "AI", icon: Bot },
  { id: "build", label: "Build", icon: Code2 },
];

const PortfolioDesk = () => {
  const [activeView, setActiveView] = useState<DeskView>("ops");
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(time), [time]);

  const view = views[activeView];
  const ViewIcon = view.icon;

  return (
    <div className="portfolio-desk" aria-label="可交互的个人工作台演示">
      <div className="desk-wallpaper" aria-hidden="true">
        <span className="desk-orbit desk-orbit-one" />
        <span className="desk-orbit desk-orbit-two" />
        <span className="desk-grid" />
      </div>

      <div className="desk-menubar">
        <div className="desk-brand">
          <span className="desk-brand-mark">L</span>
          <span>Leo OS</span>
        </div>
        <div className="desk-menubar-meta">
          <span className="desk-live-dot" />
          <span>Live workspace</span>
          <time>{formattedTime}</time>
        </div>
      </div>

      <motion.div
        className="desk-window"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="desk-window-bar">
          <div className="window-controls" aria-hidden="true"><span /><span /><span /></div>
          <span className="window-title">workspace / {activeView}</span>
          <MousePointer2 className="window-cursor" size={14} aria-hidden="true" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className={`desk-window-content tone-${view.tone}`}
            key={activeView}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.2 }}
          >
            <div className="desk-heading">
              <div className="desk-app-icon"><ViewIcon size={22} /></div>
              <div><p>{view.kicker}</p><h3>{view.title}</h3></div>
            </div>

            <div className="desk-task-list">
              {view.items.map((item, index) => (
                <motion.div
                  className="desk-task"
                  key={item.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <span className="task-index">0{index + 1}</span>
                  <div className="task-copy"><strong>{item.label}</strong><span>{item.detail}</span></div>
                  <span className="task-status"><Check size={11} />{item.status}</span>
                </motion.div>
              ))}
            </div>

            <div className="desk-footer-line">
              <Sparkles size={13} />
              <span>Click the dock to switch context</span>
              <span className="desk-progress"><i /></span>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="desk-dock" role="tablist" aria-label="切换工作台内容">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`打开 ${item.label} 工作台`}
              className={isActive ? "is-active" : ""}
              key={item.id}
              onClick={() => setActiveView(item.id)}
            >
              <Icon size={19} /><span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioDesk;
