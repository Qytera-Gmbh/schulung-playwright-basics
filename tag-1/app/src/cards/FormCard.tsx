import {
  Box,
  Button,
  Card,
  ColorInput,
  Fieldset,
  Group,
  NumberInput,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { DateValue } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import InvitationModal from "../modals/invitation-modal/InvitationModal";

export interface PartyForm {
  host: {
    name: string;
    email: string;
  };
  location: {
    street: string;
    city: string;
    streetNumber: number;
  };
  dressCode: {
    primaryColor: string;
    secondaryColor: string;
  };
  additionalInformation: {
    comments: string;
  };
}

export default function FormCard(props: { selectedDay: DateValue; selectedTime: DateValue }) {
  const [invitationModalOpened, invitationModalCallbacks] = useDisclosure(false);
  const [submittedValues, setSubmittedValues] = useState<PartyForm | null>(null);
  const form = useForm<PartyForm>({
    mode: "uncontrolled",
    initialValues: {
      host: {
        name: "",
        email: "",
      },
      location: {
        city: "",
        street: "",
        streetNumber: 0,
      },
      dressCode: {
        primaryColor: "#a1589f",
        secondaryColor: "#1f97b5",
      },
      additionalInformation: {
        comments: "",
      },
    },
    validate: {
      host: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        name: (value) => (value.length > 0 ? null : "Name required"),
      },
      location: {
        street: (value) => (value.length > 0 ? null : "Street required"),
        streetNumber: (value) => (value > 0 ? null : "Street number must be greater than 0"),
        city: (value) => (value.length > 0 ? null : "City required"),
      },
    },
  });

  return (
    <>
      <InvitationModal
        opened={invitationModalOpened}
        onClose={invitationModalCallbacks.close}
        data={submittedValues}
        selectedDay={props.selectedDay}
        selectedTime={props.selectedTime}
      />
      <Card>
        <Box>
          <Title order={5}>Invitation</Title>
          <Text size="sm" c="dimmed">
            Prepare the invitation card.
          </Text>
        </Box>
        <Box mt="md">
          <form
            onSubmit={form.onSubmit((values) => {
              setSubmittedValues(values);
              invitationModalCallbacks.open();
            })}
          >
            <Stack gap="lg">
              <Fieldset legend="Host" data-testid="host">
                <Stack gap="lg">
                  <TextInput
                    withAsterisk
                    label="Name"
                    data-testid="name"
                    placeholder="Jane Doe"
                    key={form.key("host.name")}
                    {...form.getInputProps("host.name")}
                  />
                  <TextInput
                    withAsterisk
                    label="Email"
                    data-testid="email"
                    placeholder="your@email.com"
                    key={form.key("host.email")}
                    {...form.getInputProps("host.email")}
                  />
                </Stack>
              </Fieldset>
              <Fieldset legend="Location" data-testid="location">
                <Stack gap="lg">
                  <Group gap="lg">
                    <TextInput
                      data-testid="street"
                      withAsterisk
                      disabled={!form.isDirty("host.name") || !form.isDirty("host.email")}
                      label="Street"
                      placeholder="Main Boulevard"
                      key={form.key("location.street")}
                      style={{ flex: 4 }}
                      {...form.getInputProps("location.street")}
                    />
                    <NumberInput
                      data-testid="streetnumber"
                      withAsterisk
                      disabled={!form.isDirty("host.name") || !form.isDirty("host.email")}
                      label="Street Number"
                      key={form.key("location.streetNumber")}
                      style={{ flex: 1 }}
                      {...form.getInputProps("location.streetNumber")}
                    />
                  </Group>
                  <TextInput
                    data-testid="city"
                    withAsterisk
                    label="City"
                    placeholder="Duckburg"
                    disabled={!form.isDirty("host.name") || !form.isDirty("host.email")}
                    key={form.key("location.city")}
                    {...form.getInputProps("location.city")}
                  />
                </Stack>
              </Fieldset>
              <Fieldset legend="Dress code" data-testid="dresscode">
                <Stack gap="lg">
                  <ColorInput
                    label={"Primary color"}
                    data-testid="primary-color"
                    disabled={!form.isDirty("host.name") || !form.isDirty("host.email")}
                    placeholder="#a1589f"
                    key={form.key("dressCode.primaryColor")}
                    {...form.getInputProps("dressCode.primaryColor")}
                  />
                  <ColorInput
                    label={"Secondary color"}
                    data-testid="secondary-color"
                    disabled={!form.isDirty("host.name") || !form.isDirty("host.email")}
                    placeholder="#1f97b5"
                    key={form.key("dressCode.secondaryColor")}
                    {...form.getInputProps("dressCode.secondaryColor")}
                  />
                </Stack>
              </Fieldset>
              <Fieldset legend="Additional information" data-testid="additional-information">
                <Stack gap="lg">
                  <Textarea
                    data-testid="comments"
                    disabled={!form.isDirty("host.name") || !form.isDirty("host.email")}
                    label="Comments"
                    placeholder=""
                    key={form.key("additionalInformation.comments")}
                    {...form.getInputProps("additionalInformation.comments")}
                  />
                </Stack>
              </Fieldset>
              <Group gap="lg" justify="flex-end" mt="md" grow>
                <Button
                  data-testid="preview-invitation"
                  type="submit"
                  disabled={!form.isDirty("host.name") || !form.isDirty("host.email")}
                >
                  Preview Invitation
                </Button>
              </Group>
            </Stack>
          </form>
        </Box>
      </Card>
    </>
  );
}
