import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import './ProfileCard.css';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ProfileCardComponent = ({
  avatarUrl = '',
  iconUrl = '',
  grainUrl = '',
  title = "Backend Developer",
  contactText = "İletişime Geç",
  onContactClick = () => {},
  behindGlowColor = "rgba(125, 190, 255, 0.67)",
  behindGlowEnabled = true,
  showIconPattern = true,
  showUserInfo = true,
  enableMobileTilt = true,
  innerGradient = DEFAULT_INNER_GRADIENT
}) => {
  const containerRef = useRef(null);
  const isMovingRef = useRef(false);
  const timeoutRef = useRef(null);

  const updateStyles = useCallback((x, y) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    const px = adjust(x, 0, 100, 0, 100);
    const py = adjust(y, 0, 100, 0, 100);
    const p_from_center = Math.sqrt((50 - px) ** 2 + (50 - py) ** 2) / 50;
    
    container.style.setProperty("--pointer-x", `${px}%`);
    container.style.setProperty("--pointer-y", `${py}%`);
    container.style.setProperty("--pointer-from-center", p_from_center);
    container.style.setProperty("--pointer-from-top", py / 100);
    container.style.setProperty("--pointer-from-left", px / 100);
    container.style.setProperty("--rotate-x", `${adjust(py, 0, 100, 15, -15)}deg`);
    container.style.setProperty("--rotate-y", `${adjust(px, 0, 100, -15, 15)}deg`);
    container.style.setProperty("--background-x", `${adjust(px, 0, 100, 20, 80)}%`);
    container.style.setProperty("--background-y", `${adjust(py, 0, 100, 20, 80)}%`);
  }, []);

  const handlePointer = useCallback((e) => {
    if (!containerRef.current) return;
    isMovingRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    updateStyles(x, y);
  }, [updateStyles]);

  const handlePointerLeave = useCallback(() => {
    isMovingRef.current = false;
    if (!containerRef.current) return;
    
    containerRef.current.style.setProperty("--rotate-x", `0deg`);
    containerRef.current.style.setProperty("--rotate-y", `0deg`);
    
    timeoutRef.current = setTimeout(() => {
      if (!isMovingRef.current && containerRef.current) {
        containerRef.current.style.setProperty("--pointer-x", "50%");
        containerRef.current.style.setProperty("--pointer-y", "50%");
        containerRef.current.style.setProperty("--pointer-from-center", "0");
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (!enableMobileTilt) return;

    const handleDeviceMotion = (e) => {
      if (isMovingRef.current) return;
      const { beta, gamma } = e;
      if (beta !== null && gamma !== null) {
        const x = adjust(clamp(gamma, -20, 20), -20, 20, 0, 100);
        const y = adjust(clamp(beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET, -10, 30), -10, 30, 0, 100);
        updateStyles(x, y);
      }
    };

    window.addEventListener("deviceorientation", handleDeviceMotion);
    return () => window.removeEventListener("deviceorientation", handleDeviceMotion);
  }, [enableMobileTilt, updateStyles]);

  const styles = useMemo(() => ({
    "--behind-glow-color": behindGlowColor,
    "--inner-gradient": innerGradient,
    "--icon": showIconPattern && iconUrl ? `url(${iconUrl})` : 'none',
    "--grain": grainUrl ? `url(${grainUrl})` : 'none'
  }), [behindGlowColor, innerGradient, showIconPattern, iconUrl, grainUrl]);

  return (
    <div 
      className={`pc-container ${behindGlowEnabled ? 'pc-glow-enabled' : ''}`}
      style={styles}
      ref={containerRef}
      onPointerMove={handlePointer}
      onPointerLeave={handlePointerLeave}
    >
      <div className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          
          <div className="pc-avatar-container">
            <img src={avatarUrl} alt={name} className="pc-avatar-img" />
          </div>

          <div className="pc-content">
            <div className="pc-details">
              <p>{title}</p>
            </div>

            {showUserInfo && (
              <div className="pc-user-info">
                <button 
                  className="pc-contact-btn"
                  onClick={onContactClick}
                  aria-label={`Contact`}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
