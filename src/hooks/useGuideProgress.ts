import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tm_guide_progress_v1';

type ProgressStore = Record<string, string[]>;

function getStoredProgress(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as ProgressStore;
    }
  } catch (err) {
    console.warn('Unable to read guide progress from localStorage:', err);
  }
  return {};
}

function saveStoredProgress(data: ProgressStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Unable to persist guide progress to localStorage:', err);
  }
}

export function useGuideProgress() {
  const [progress, setProgress] = useState<ProgressStore>(getStoredProgress);

  // Sync state if storage event fires in another tab
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setProgress(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const isStepChecked = useCallback((roleId: string, stepId: string): boolean => {
    const roleSteps = progress[roleId] || [];
    return roleSteps.includes(stepId);
  }, [progress]);

  const toggleStep = useCallback((roleId: string, stepId: string): void => {
    setProgress((prev) => {
      const currentRoleSteps = prev[roleId] || [];
      const isAlreadyChecked = currentRoleSteps.includes(stepId);
      const nextRoleSteps = isAlreadyChecked
        ? currentRoleSteps.filter((id) => id !== stepId)
        : [...currentRoleSteps, stepId];

      const nextStore = {
        ...prev,
        [roleId]: nextRoleSteps,
      };

      saveStoredProgress(nextStore);
      return nextStore;
    });
  }, []);

  const getRoleProgress = useCallback((roleId: string, totalSteps: number) => {
    const roleSteps = progress[roleId] || [];
    const completed = roleSteps.length;
    const percentage = totalSteps > 0 ? Math.min(100, Math.round((completed / totalSteps) * 100)) : 0;
    const isAllDone = totalSteps > 0 && completed >= totalSteps;

    return {
      completed,
      total: totalSteps,
      percentage,
      isAllDone,
    };
  }, [progress]);

  const resetRoleProgress = useCallback((roleId: string): void => {
    setProgress((prev) => {
      const nextStore = {
        ...prev,
        [roleId]: [],
      };
      saveStoredProgress(nextStore);
      return nextStore;
    });
  }, []);

  const resetAllProgress = useCallback((): void => {
    const emptyStore = {};
    saveStoredProgress(emptyStore);
    setProgress(emptyStore);
  }, []);

  return {
    progress,
    isStepChecked,
    toggleStep,
    getRoleProgress,
    resetRoleProgress,
    resetAllProgress,
  };
}

export default useGuideProgress;
