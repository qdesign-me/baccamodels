import React from 'react';
import Volume from 'components/Volume';
import Scroll from 'components/Scroll';
import useLocalStorage from 'hooks/useLocalStorage';
function Header({ video, img, scroll, children, className = 'cover full-bg' }) {
  const [muted, setMuted] = useLocalStorage('muted', true);
  return (
    <header className={className}>
      {img && <img src={img} alt="" className="pull-right" />}
      {video && <video autoPlay muted={muted} loop playsInline src={video} />}
      {children}
      <div className="icons-nav">
        <div className="container  flex justify-between">
          {scroll ? <Scroll className="scroll-down can-hide" /> : <div />}
          {video && <Volume muted={muted} setMuted={setMuted} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
