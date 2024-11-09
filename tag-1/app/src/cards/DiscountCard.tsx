import { Box, Card, Loader, Stack, Switch, Text, Title } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

export default function DiscountCard() {
  const [isClaimed, setIsClaimed] = useState(false);
  const [currentSecond, setCurrentSecond] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setCurrentSecond((currentTime) => currentTime + 1);
    }, 1000);
  }, [setCurrentSecond]);

  const showSpinner = useMemo(() => {
    return !isClaimed && currentSecond % 5 !== 0;
  }, [isClaimed, currentSecond]);

  return (
    <Card data-testid="card-caterer">
      <Box>
        <Title order={5}>Discount</Title>
        <Text size="sm" c="dimmed">
          Unlock your party discount!
        </Text>
      </Box>
      <Box mt="lg">
        <Stack>
          <Box>
            <Text size="md">{"Feeling lucky? Click below to claim a special discount!"}</Text>
            <Text size="sm" c="dimmed">
              {"Note: The discount can only be claimed at certain "}
              <Text span variant="gradient" gradient={{ from: "pink", to: "lime", deg: 90 }}>
                {"magical moments."}
              </Text>
            </Text>
          </Box>
          {showSpinner ? (
            <Loader data-testid="spinner-discount" type="bars" size="sm" />
          ) : (
            <Switch
              label="Apply 20% discount"
              data-testid="switch-discount"
              onChange={(event) => setIsClaimed(event.currentTarget.checked)}
            />
          )}
        </Stack>
      </Box>
    </Card>
  );
}
