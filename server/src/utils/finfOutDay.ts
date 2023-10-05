// const month: string[] = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
export const findDay = (sekund: number) => {
  const startdate = new Date(sekund);
  return 30 - startdate.getDate() > 0 ? 30 - startdate.getDate() : 1;
};
