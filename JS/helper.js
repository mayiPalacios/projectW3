export const getData = () => {
  let dataSave = JSON.parse(localStorage.getItem("filters"));
  return dataSave;
};
