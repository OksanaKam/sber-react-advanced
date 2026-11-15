import { useCallback, useEffect, useRef, useState } from 'react';

export type ConfirmDialogOptions = {
  title: string;
  description: string;
};

export function useConfirmDialog() {
  const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);
  const resolveRef = useRef<((confirmed: boolean) => void) | null>(null);

  const showConfirmDialog = useCallback((nextOptions: ConfirmDialogOptions) => {
    resolveRef.current?.(false);
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
      setOptions(nextOptions);
    });
  }, []);

  const handleResult = useCallback((confirmed: boolean) => {
    const resolve = resolveRef.current;
    resolveRef.current = null;
    setOptions(null);
    resolve?.(confirmed);
  }, []);

  useEffect(() => {
    return () => {
      resolveRef.current?.(false);
      resolveRef.current = null;
    };
  }, []);

  return { options, showConfirmDialog, handleResult };
}
