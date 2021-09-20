import React from 'react';
import Volume from 'components/Volume';
import Scroll from 'components/Scroll';
import useLocalStorage from 'hooks/useLocalStorage';
function Header({ video, scroll, children }) {
  const [muted, setMuted] = useLocalStorage('muted', true);
  return (
    <header className="cover full-bg">
      <video autoPlay muted={muted} loop playsInline src={video}></video>
      {children}
      <div className="icons-nav">
        <div className="container  flex justify-between">
          {scroll ? <Scroll className="scroll-down can-hide" /> : <div />}
          <Volume muted={muted} setMuted={setMuted} />
        </div>
      </div>
    </header>
  );
}

export default Header;
