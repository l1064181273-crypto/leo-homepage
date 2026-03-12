import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToAnchor = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // 如果有 hash，尝试滚动
    if (hash) {
      // 稍微延迟一点，等待页面渲染完成
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // 100ms 延迟通常足够

      return () => clearTimeout(timer);
    } 
    // 如果没有 hash，且是页面跳转（不是同一个页面的 hash 变化），则滚动到顶部
    else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToAnchor;
