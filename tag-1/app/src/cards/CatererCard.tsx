import {
  Avatar,
  Box,
  Card,
  Divider,
  Group,
  Radio,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { CATERERS } from "../constants";

export default function CatererCard(props: {
  caterers: (typeof CATERERS)[number][];
  selectedCaterer: (typeof CATERERS)[number] | null;
  onCatererSelect: (email: string) => void;
}) {
  return (
    <Card data-testid="card-caterer">
      <Box>
        <Title order={5}>Caterer</Title>
        <Text size="sm" c="dimmed">
          Select a caterer.
        </Text>
      </Box>
      <Box mt="lg">
        <SimpleGrid cols={{ lg: 2 }} spacing="md">
          <Box>
            <Radio.Group value={props.selectedCaterer?.email} onChange={props.onCatererSelect}>
              <Stack gap="lg">
                {props.caterers.map((caterer) => {
                  return (
                    <Group>
                      <Radio value={caterer.email} />
                      <Avatar src={caterer.avatar} alt="Image" radius="xl" />
                      <div>
                        <Text fw={500} data-testid="caterer-name">
                          {caterer.name}
                        </Text>
                        <Text size="xs" c="dimmed" data-testid="caterer-email">
                          {caterer.email}
                        </Text>
                      </div>
                    </Group>
                  );
                })}
              </Stack>
            </Radio.Group>
          </Box>
          <Box>
            <Stack>
              {props.selectedCaterer ? (
                <>
                  <Text size="lg" data-testid="selected-caterer-name">
                    {props.selectedCaterer.name}
                  </Text>
                  <Divider />
                  <Text size="sm" c="dimmed" fs="italic" data-testid="selected-caterer-description">
                    {props.selectedCaterer.description}
                  </Text>
                </>
              ) : null}
            </Stack>
          </Box>
        </SimpleGrid>
      </Box>
    </Card>
  );
}
