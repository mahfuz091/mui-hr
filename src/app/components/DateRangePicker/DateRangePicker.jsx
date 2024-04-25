import React from "react";
import dayjs from "dayjs";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const DateRangePicker = ({ dates, setDates }) => {
  return <RangePicker fullWidth onChange={(values) => setDates(values)} />;
};

export default DateRangePicker;
