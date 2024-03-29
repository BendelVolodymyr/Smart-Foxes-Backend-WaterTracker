export const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  const codeStatus = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  error.status = codeStatus;
  next();
};
