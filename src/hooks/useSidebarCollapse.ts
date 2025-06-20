import { useState, useCallback } from 'react';

interface UseSidebarCollapseReturn {
  isVisible: boolean;
  toggleSidebar: () => void;
  showSidebar: () => void;
  hideSidebar: () => void;
}

export const useSidebarCollapse = (initialState: boolean = true): UseSidebarCollapseReturn => {
  const [isVisible, setIsVisible] = useState<boolean>(initialState);

  const toggleSidebar = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  const showSidebar = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideSidebar = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isVisible,
    toggleSidebar,
    showSidebar,
    hideSidebar
  };
}; 