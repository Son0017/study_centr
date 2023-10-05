"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDay = void 0;
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
const findDay = (sekund) => {
    const startdate = new Date(sekund);
    return 30 - startdate.getDate() > 0 ? 30 - startdate.getDate() : 1;
};
exports.findDay = findDay;
