import { Avatar, Box, Card, Group, Radio, Stack, Text, Title } from "@mantine/core";

export default function CatererCard(props: {
  caterers: { name: string; email: string; avatar: string }[];
  // onCatererSelect: (index: number) => void;
}) {
  return (
    <Card>
      <Box>
        <Title order={5}>Caterer</Title>
        <Text size="sm" c="dimmed">
          Select a caterer.
        </Text>
      </Box>
      <Box mt="lg">
        <Radio.Group>
          <Stack gap="lg">
            {props.caterers.map((caterer) => {
              return (
                <Group>
                  <Radio />
                  <Avatar src={caterer.avatar} alt="Image" radius="xl" />
                  <div>
                    <Text size="sm" fw={500}>
                      {caterer.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {caterer.email}
                    </Text>
                  </div>
                </Group>
              );
            })}
          </Stack>
        </Radio.Group>
      </Box>
    </Card>
  );
}
