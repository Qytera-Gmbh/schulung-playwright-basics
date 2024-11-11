import { Box, Card, Checkbox, Group, Space, Text, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import { DateValue } from "@mantine/dates";
import { useMemo } from "react";

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", { weekday: "long" });

export default function FingerFoodCard({ date }: { date: DateValue }) {
  const dayString = useMemo(() => (date ? DATE_FORMAT.format(date) : "none"), [date]);

  return (
    <Card>
      <Box>
        <Title order={5}>Finger Food</Title>
        <Text size="sm" c="dimmed">
          Choose finger food options.
        </Text>
      </Box>
      <Box mt="md">
        <Group justify="space-between" grow>
          <Checkbox
            defaultChecked={true}
            label="Salad"
            description="Tomato, Lettuce, Cucumber"
            data-testid="checkbox-salad"
          />
          <Checkbox
            defaultChecked={false}
            label="Pizza"
            description="Onions, Pepperoni, Garlic"
            data-testid="checkbox-pizza"
          />
          <Checkbox
            defaultChecked
            disabled={date?.getDay() !== 0 && date?.getDay() !== 6}
            label="Beer"
            description={`Only available on weekends. Selected day: ${dayString}`}
            data-testid="checkbox-beer"
          />
        </Group>
        <Space h="lg" />
        <Group justify="space-between" grow>
          <Checkbox
            defaultChecked={false}
            label="Ice Cream"
            description="Vanilla, Chocolate, Peppermint"
            data-testid="checkbox-icecream"
          />
          <Checkbox
            defaultChecked={false}
            label="Chicken Wings"
            description="Spicy, Sweet & Sour"
            data-testid="checkbox-chickenwings"
          />
          <Checkbox
            defaultChecked={false}
            label="Veggie Sticks"
            description="Grilled Pepper, Mozzarella"
            data-testid="veggiesticks"
          />
        </Group>
      </Box>
    </Card>
  );
}
