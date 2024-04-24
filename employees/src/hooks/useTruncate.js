const useTruncate = (str, length) => {
  if (str.length > length) {
    return `${str.substring(0, length)}...`;
  }

  return str.substring(0, length);
};

export default useTruncate;
