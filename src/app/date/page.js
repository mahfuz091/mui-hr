"use client";
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs from "dayjs";
import { TextField, Box } from "@mui/material";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const page = () => {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [dates, setDates] = useState([]);
  // const start_dateObj = dayjs(date.startDate);
  // const start_date = start_dateObj.format("YYYY-MM-DD");
  // const end_dateObj = dayjs(date.endDate);
  // const end_date = end_dateObj.format("YYYY-MM-DD");
  const start_date = dates[0];
  const end_date = dates[1];

  console.log(start_date, "-", end_date);
  const handleChange = (ranges) => {
    setDate(ranges.selection);
  };

  return (
    <>
      <Box>
        <TextField disabled placeholder={`${start_date} - ${end_date}`} />
        <DateRangePicker onChange={handleChange} ranges={[date]} />
        <RangePicker
          onChange={(values) =>
            setDates(
              values.map((item) => {
                return dayjs(item).format("YYYY-MM-DD");
              })
            )
          }
        />
      </Box>
    </>
  );
};

export default page;
