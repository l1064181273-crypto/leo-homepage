import { motion } from "framer-motion";
import { ArrowLeft, Check, Copy, Github, Mail, MessageCircle, MoveUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import avatarImage from "@/assets/avatar-3d.png";
import wechatQr from "@/assets/wechat-qr.jpg";
import "@/styles/contact-os.css";

const WECHAT_ID = "Lntano.";

const Friend = () => {
  const [copied, setCopied] = useState(false);

  const copyWechat = async () => {
    await navigator.clipboard.writeText(WECHAT_ID);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="contact-os-page">
      <div className="contact-os-wallpaper" aria-hidden="true">
        <i className="contact-orbit contact-orbit-one" />
        <i className="contact-orbit contact-orbit-two" />
        <i className="contact-grid" />
      </div>

      <motion.section
        className="contact-window"
        aria-label="联系 Haonan Li"
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="contact-titlebar">
          <div className="contact-traffic" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <strong>Contact</strong>
          <span>AVAILABLE</span>
        </header>

        <div className="contact-window-body">
          <aside className="contact-profile">
            <Link className="contact-back" to="/">
              <ArrowLeft size={16} />
              返回桌面
            </Link>

            <div className="contact-avatar-wrap">
              <img src={avatarImage} alt="Haonan Li" />
              <i aria-hidden="true" />
            </div>

            <div className="contact-profile-copy">
              <p>PROFILE CARD</p>
              <h1>Haonan Li</h1>
              <span>AI Data Operator</span>
              <span>Vibe Builder</span>
            </div>

            <div className="contact-availability">
              <i aria-hidden="true" />
              <div>
                <strong>开放交流</strong>
                <span>通常会在看到后回复</span>
              </div>
            </div>

            <div className="contact-topics">
              <p>可以聊聊</p>
              <div>
                <span>AI 数据业务</span>
                <span>本地生活</span>
                <span>电商运营</span>
                <span>Vibe Coding</span>
              </div>
            </div>

            <p className="contact-side-note">
              认真认识新的人
              <br />
              也认真对待每一次合作
            </p>
          </aside>

          <section className="contact-main">
            <div className="contact-intro">
              <p>LET US CONNECT</p>
              <h2>
                从一次真实的
                <br />
                交流开始
              </h2>
              <span>如果你也关注 AI 数据业务和产品创造欢迎认识我</span>
            </div>

            <div className="contact-channel-grid">
              <article className="contact-wechat-card">
                <div className="contact-card-heading">
                  <div>
                    <MessageCircle size={19} />
                    <span>WECHAT</span>
                  </div>
                  <span>PRIMARY</span>
                </div>

                <div className="contact-qr-shell">
                  <img src={wechatQr} alt="Haonan Li 的微信二维码" />
                  <i className="contact-corner contact-corner-tl" />
                  <i className="contact-corner contact-corner-tr" />
                  <i className="contact-corner contact-corner-bl" />
                  <i className="contact-corner contact-corner-br" />
                </div>

                <div className="contact-wechat-meta">
                  <div>
                    <span>微信号</span>
                    <strong>{WECHAT_ID}</strong>
                  </div>
                  <button type="button" onClick={copyWechat} aria-live="polite">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "已复制" : "复制微信号"}
                  </button>
                </div>
              </article>

              <div className="contact-secondary-stack">
                <a
                  className="contact-channel-card"
                  href="https://github.com/l1064181273-crypto"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <Github size={21} />
                    <span>GITHUB</span>
                  </div>
                  <strong>查看我的构建记录</strong>
                  <p>代码和网站的每次迭代都留在这里</p>
                  <MoveUpRight size={19} />
                </a>

                <div className="contact-message-card">
                  <Mail size={21} />
                  <p>发来消息时可以简单介绍你是谁以及想聊什么</p>
                  <span>NO FORM REQUIRED</span>
                </div>
              </div>
            </div>

            <footer className="contact-footer">
              <span>HAONAN LI</span>
              <span>SHANGHAI CN</span>
              <span>2026</span>
            </footer>
          </section>
        </div>
      </motion.section>
    </main>
  );
};

export default Friend;
