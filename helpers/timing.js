const timing = (time) => {
  const dateNow = new Date();
  const dateCreated = new Date(time);
  const differents = dateNow.getTime() - dateCreated.getTime();
  const difHours = differents / 1000 / 60 / 60;
  return difHours;
};

export default timing;
