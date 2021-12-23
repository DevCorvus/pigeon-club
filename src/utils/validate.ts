import val from 'validator';

export const validateMessage = (content: string): string | false => {
  let result = null;
  result = val.trim(content);
  if (!val.isLength(result, { min: 1, max: 2000 })) return false;
  result = val.escape(result);
  return result;
};