const getUrl = (req) => {
  const img = req.file;
  const filename = img.filename;

  return `${config.host}:${config.port}/public/${filename}`;
};
