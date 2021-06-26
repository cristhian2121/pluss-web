import * as dayjs from "dayjs";

/**
 * Parse data how date to format "DD/MM/YYYY"
 * @param {*} data []
 * @returns data[]
 */
export const parseData = (data = []) => {
  for (let i in data) {
    if (data[i].date_created) {
      data[i].date_created = dayjs(data[i].date_created).format("DD/MM/YYYY");
    }
  }
  return data;
};
