import { differenceInCalendarDays, addDays, isWeekend } from "date-fns";

export const handleURLQueries = (router, path) => {
  if (Object.keys(router.query).length && path) {
    const arr = Object.keys(router.query);

    return (
      router.asPath.includes(path) &&
      router.asPath.includes(router.query[arr[0]]) &&
      path !== "/"
    );
  }

  return false;
};

// Define custom weekend days (e.g., Saturday and Sunday)
const customWeekendDays = [6, 0]; // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

export const calculateBusinessDays = (startDate, endDate) => {
  let currentDate = new Date(startDate);
  let businessDays = 0;

  while (currentDate <= new Date(endDate)) {
    if (
      !isWeekend(currentDate) &&
      !customWeekendDays.includes(currentDate.getDay())
    ) {
      businessDays++;
    }
    currentDate = addDays(currentDate, 1);
  }

  return businessDays;
};
