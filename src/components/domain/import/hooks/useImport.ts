import { useState } from 'react';

export const useImport = () => {
  const [importData, setImportData] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImportData(e.target.value);
  };

  return { importData, handleChange };
};
