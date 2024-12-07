const convertBase64String = (key?: string): string => {
  if (!key) {
    throw new Error('Key has not been assigned.');
  }

  const convertedKey = Buffer.from(key, 'base64').toString('utf8');

  return JSON.parse(convertedKey);
};

export default convertBase64String;
