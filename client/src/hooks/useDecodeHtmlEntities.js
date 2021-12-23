import { useState, useEffect } from 'react';
import { decode } from 'he';

const useDecodeHtmlEntities = (text) => {
  const [decodedText, setDecodedText] = useState(decode(text));

  useEffect(() => {
    setDecodedText(decode(text));
  }, [text]);

  return decodedText;
};

export default useDecodeHtmlEntities;