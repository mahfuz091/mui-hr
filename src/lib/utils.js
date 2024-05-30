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
// const customWeekendDays = [6, 0]; // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

export const calculateBusinessDays = (startDate, endDate, setting) => {
  let currentDate = new Date(startDate);
  let businessDays = 0;

  const dayNameToNumber = (dayName) => {
    const days = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    return days[dayName];
  };

  const customWeekendDays = setting?.value?.map(dayNameToNumber);

  while (currentDate <= new Date(endDate)) {
    if (
      !isWeekend(currentDate) &&
      !customWeekendDays?.includes(currentDate.getDay())
    ) {
      businessDays++;
    }
    currentDate = addDays(currentDate, 1);
  }

  return businessDays;
};
