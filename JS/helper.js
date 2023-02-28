export const getData = () => {
  let dataSave = JSON.parse(localStorage.getItem("filters"));
  return dataSave;
};

export const getNewCard = () => {
  let dataSave = JSON.parse(localStorage.getItem("newCard"));
  return dataSave;
};
