import { useState, useRef, useEffect } from 'react';
import styles from './Tabs.module.css';
import { LucideIcon, ChevronDown } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TabsProps {
  tabs: Tab[];
  moreTabs?: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, moreTabs, activeTab, onChange }: TabsProps) {
  const [showMore, setShowMore] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMore(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isMoreTabActive = moreTabs?.some(t => t.id === activeTab);

  return (
    <div className={styles.tabsWrapper}>
      <div className={styles.tabsContainer}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => {
                onChange(tab.id);
                setShowMore(false);
              }}
            >
              <div className={styles.iconBox}>
                <Icon size={24} />
              </div>
              <span className={styles.label}>{tab.label}</span>
            </button>
          );
        })}

        {moreTabs && moreTabs.length > 0 && (
          <div className={styles.moreWrapper} ref={dropdownRef}>
            <button
              className={`${styles.tab} ${styles.moreDropdownBtn} ${isMoreTabActive ? styles.active : ''}`}
              onClick={() => setShowMore(!showMore)}
            >
              <span className={styles.label}>{isMoreTabActive ? moreTabs.find(t => t.id === activeTab)?.label : 'More'}</span>
              <ChevronDown size={20} className={showMore ? styles.rotate : ''} />
            </button>

            {showMore && (
              <div className={styles.dropdownMenu}>
                {moreTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      className={`${styles.dropdownItem} ${activeTab === tab.id ? styles.activeItem : ''}`}
                      onClick={() => {
                        onChange(tab.id);
                        setShowMore(false);
                      }}
                    >
                      <Icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
