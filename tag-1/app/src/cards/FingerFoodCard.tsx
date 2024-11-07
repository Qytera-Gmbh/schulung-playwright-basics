import {
  Card,
  Checkbox,
  Divider,
  Group,
  Space,
  Text,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useMemo } from "react";

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", { weekday: "long" });

export default function FingerFoodCard({ date }: { date: Date }) {
  const dayString = useMemo(() => DATE_FORMAT.format(date), [date]);

  return (
    <Card>
      <Title order={3}>
        <Text>Food</Text>
      </Title>
      <Divider my="md" />
      <Group justify="space-between" grow>
        <Checkbox
          defaultChecked={true}
          label="Salad"
          description="Tomato, Lettuce, Cucumber"
        />
        <Checkbox
          defaultChecked={false}
          label="Pizza"
          description="Onions, Pepperoni, Garlic"
        />
        <Checkbox
          defaultChecked
          disabled
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
          data-testid="checkbox-icecream"
        />
        <Checkbox
          defaultChecked={false}
          label="Chicken Wings"
          description="Spicy, Sweet & Sour"
        />
        <Checkbox
          defaultChecked={false}
          label="Veggie Sticks"
          description="Grilled Pepper, Mozzarella"
        />
      </Group>
    </Card>
  );
}
