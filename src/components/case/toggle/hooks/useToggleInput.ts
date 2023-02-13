import { useCallback, useEffect, useState } from 'react';

export const useToggleInput = (inputRef: React.RefObject<HTMLElement>) => {
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const elm = inputRef.current;
    if (!elm) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (!elm.contains(e.target as Node) && isEditable) {
        setIsEditable(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [inputRef, isEditable]);

  const handleEnable = useCallback(() => {
    setIsEditable(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && e.keyCode === 13) {
        setIsEditable(false);
      }
    },
    []
  );

  return { isEditable, handleEnable, handleKeyDown };
};
