import { Card, Checkbox, Divider, Group, Space, Text, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import { DateValue } from "@mantine/dates";
import { useMemo } from "react";

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", { weekday: "long" });

export default function FingerFoodCard({ date }: { date: DateValue }) {
  const dayString = useMemo(() => (date ? DATE_FORMAT.format(date) : "none"), [date]);

  return (
    <Card>
      <Title order={3}>
        <Text>Food</Text>
      </Title>
      <Divider my="md" />
      <Group justify="space-between" grow>
        <Checkbox defaultChecked={true} label="Salad" description="Tomato, Lettuce, Cucumber" />
        <Checkbox defaultChecked={false} label="Pizza" description="Onions, Pepperoni, Garlic" />
        <Checkbox
          defaultChecked
          disabled={date?.getDay() !== 0 && date?.getDay() !== 6}
          label="Beer"
          description={`Only available on weekends. Selected day: ${dayString}`}
        />
      </Group>
      <Space h="lg" />
      <Group justify="space-between" grow>
        <Checkbox
          defaultChecked={false}
          label="Ice Cream"
          description="Vanilla, Chocolate, Peppermint"
        />
        <Checkbox defaultChecked={false} label="Chicken Wings" description="Spicy, Sweet & Sour" />
        <Checkbox
          defaultChecked={false}
          label="Veggie Sticks"
          description="Grilled Pepper, Mozzarella"
        />
      </Group>
    </Card>
  );
}
