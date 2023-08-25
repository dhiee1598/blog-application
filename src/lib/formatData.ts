const formatDate = (value: Date) => {
  const format = new Date(value).toLocaleString();
  return format;
};

export default formatDate;
