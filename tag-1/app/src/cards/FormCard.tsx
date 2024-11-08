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
  organiser: {
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
      organiser: {
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
      organiser: {
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
              <Fieldset legend="Organizer">
                <Stack gap="lg">
                  <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Jane Doe"
                    key={form.key("organiser.name")}
                    {...form.getInputProps("organiser.name")}
                  />
                  <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    key={form.key("organiser.email")}
                    {...form.getInputProps("organiser.email")}
                  />
                </Stack>
              </Fieldset>
              <Fieldset legend="Location">
                <Stack gap="lg">
                  <Group gap="lg">
                    <TextInput
                      withAsterisk
                      disabled={!form.isDirty("organiser.name") || !form.isDirty("organiser.email")}
                      label="Street"
                      placeholder="Main Boulevard"
                      key={form.key("location.street")}
                      style={{ flex: 4 }}
                      {...form.getInputProps("location.street")}
                    />
                    <NumberInput
                      withAsterisk
                      disabled={!form.isDirty("organiser.name") || !form.isDirty("organiser.email")}
                      label="Street Number"
                      key={form.key("location.streetNumber")}
                      style={{ flex: 1 }}
                      {...form.getInputProps("location.streetNumber")}
                    />
                  </Group>
                  <TextInput
                    withAsterisk
                    label="City"
                    placeholder="Duckburg"
                    disabled={!form.isDirty("organiser.name") || !form.isDirty("organiser.email")}
                    key={form.key("location.city")}
                    {...form.getInputProps("location.city")}
                  />
                </Stack>
              </Fieldset>
              <Fieldset legend="Dress code">
                <ColorInput
                  label={"Primary color"}
                  data-testid="colorPicker PrimaryColor"
                  disabled={!form.isDirty("organiser.name") || !form.isDirty("organiser.email")}
                  placeholder="#a1589f"
                  key={form.key("dressCode.primaryColor")}
                  {...form.getInputProps("dressCode.primaryColor")}
                />
                <ColorInput
                  label={"Secondary color"}
                  data-testid="colorPicker SecondaryColor"
                  disabled={!form.isDirty("organiser.name") || !form.isDirty("organiser.email")}
                  placeholder="#1f97b5"
                  key={form.key("dressCode.secondaryColor")}
                  {...form.getInputProps("dressCode.secondaryColor")}
                />
              </Fieldset>
              <Fieldset legend="Additional information">
                <Textarea
                  disabled={!form.isDirty("organiser.name") || !form.isDirty("organiser.email")}
                  label="Comments"
                  placeholder=""
                  key={form.key("additionalInformation.comments")}
                  {...form.getInputProps("additionalInformation.comments")}
                />
              </Fieldset>
              <Group justify="flex-end" mt="md" grow>
                <Button
                  type="submit"
                  disabled={!form.isDirty("organiser.name") || !form.isDirty("organiser.email")}
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
