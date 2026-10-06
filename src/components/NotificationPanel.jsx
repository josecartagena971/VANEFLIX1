import React, { useRef, useEffect } from 'react';
import { CheckCheck } from 'lucide-react';
import { soundEffects } from '../utils/audioEffects';

export default function NotificationPanel({
  notifications,
  onNotificationClick,
  onMarkAllAsRead,
  onClose
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="notifications-dropdown" ref={panelRef}>
      <div className="notif-header">
        <h4>Notificaciones de Amor</h4>
        <button
          onClick={() => {
            soundEffects.playPop();
            onMarkAllAsRead();
          }}
          style={{ fontSize: '0.78rem', color: '#fda4af', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <CheckCheck size={14} /> Leídas
        </button>
      </div>

      <ul className="notif-list">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`notif-item ${n.isUnread ? 'unread' : ''}`}
            onClick={() => {
              soundEffects.playPop();
              onNotificationClick(n);
            }}
          >
            <span className="notif-icon-circle">{n.icon}</span>
            <div>
              <div className="notif-content-title">{n.title}</div>
              <div className="notif-content-msg">{n.message}</div>
              <div className="notif-content-time">{n.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
