'use client';

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Badge, Box, Grid, Tooltip, Typography } from '@mui/material';
import { useSlotProps, SlotComponentProps } from '@mui/base/utils';
import EventNoteIcon from '@mui/icons-material/EventNote'; // 导入日历图标

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const exams = [
  dayjs('2024-02-20'),
  dayjs('2024-02-27'),
  dayjs('2024-03-4'),
  // ...其他考试日期...
];

export default function StaticDatePickerLandscape() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [month, setMonth] = React.useState<number>(dayjs().month());

  const renderDay = (day: dayjs.Dayjs) => {
    const isCurrentMonth = day.month() === month;
    const isToday = dayjs().isSame(day, 'day');

    const isExamDay = exams.some((exam) => day.isSame(exam, 'day'));

    return (
      <Tooltip title={isExamDay ? "这天有考试" : ""} placement="top" arrow>
        <Badge variant="dot" color="error" invisible={!(isExamDay && isCurrentMonth)}>
          <PickersDay
            day={day}
            onDaySelect={() => {}}
            selected={isToday}
            outsideCurrentMonth={false}
            disableMargin // Optional: you might want to disable margin for the `PickersDay` component
            role='gridcell'
            style={{ width: '36px', height: '36px', margin: '0 2px', visibility: isCurrentMonth ? 'visible' : 'hidden' }}
          />
        </Badge>
      </Tooltip>
   
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Grid container alignItems="center" justifyContent="flex-start" spacing={1} sx={{ pl: 3, pr: 3, mt: 1 }}>
          <Grid item>
            <EventNoteIcon /> {/* 这里是左侧的图标 */}
          </Grid>
          <Grid item xs>
            <Typography variant="h6" component="h2" sx={{ display: 'inline' }}>
              考试日历
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ fontSize: 12, textAlign: 'right', color: '#999' }}>
              （红点日期为考试日）
            </Typography>
          </Grid>
        </Grid>
        <CalendarPicker
          date={date}
          onChange={(newDate) => setDate(newDate)}
          onMonthChange={(day) => setMonth(day.month())}
          renderDay={renderDay}
        />
      </Box>
    </LocalizationProvider>
  );
}