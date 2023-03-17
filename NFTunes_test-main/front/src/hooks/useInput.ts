import React, { useState } from 'react';

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return { value, setValue, onChange };
};

export default useInput;
