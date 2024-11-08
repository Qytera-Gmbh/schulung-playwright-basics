import { Box, Card, NativeSelect, Stack, Text, Title } from "@mantine/core";
import { DatePickerInput, DateValue } from "@mantine/dates";
import { useMemo } from "react";
import { TIMESLOTS } from "../constants";

import "@mantine/dates/styles.css";

export default function CalendarCard(props: {
  selectedDate: DateValue;
  onDateChange: (value: DateValue) => void;
  selectedTime: DateValue;
  onTimeChange: (value: DateValue) => void;
}) {
  const dates = useMemo(() => {
    const timeFormatter = new Intl.DateTimeFormat(undefined, { timeStyle: "short" });
    const map = new Map<string, Date>();
    for (const date of TIMESLOTS) {
      const formattedDate = timeFormatter.format(date);
      map.set(formattedDate, date);
    }
    return map;
  }, []);

  const formattedDates = useMemo(() => {
    const timeFormatter = new Intl.DateTimeFormat(undefined, { timeStyle: "short" });
    const map = new Map<Date, string>();
    for (const date of TIMESLOTS) {
      const formattedDate = timeFormatter.format(date);
      map.set(date, formattedDate);
    }
    return map;
  }, []);

  return (
    <Card>
      <Box>
        <Title order={5}>Date</Title>
        <Text size="sm" c="dimmed">
          Select the party date and time.
        </Text>
      </Box>
      <Box mt="lg">
        <Stack gap="lg">
          <DatePickerInput
            value={props.selectedDate}
            onChange={props.onDateChange}
            label="Party Date"
          />
          <NativeSelect
            label="Party Time"
            data={[...dates.keys()]}
            value={props.selectedTime ? formattedDates.get(props.selectedTime) : undefined}
            onChange={(event) => {
              const date = dates.get(event.currentTarget.value);
              if (!date) {
                return;
              }
              props.onTimeChange(date);
            }}
          />
        </Stack>
      </Box>
    </Card>
  );
}
