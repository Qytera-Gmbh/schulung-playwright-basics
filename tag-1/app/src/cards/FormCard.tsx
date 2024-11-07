import {
  Button,
  Card,
  ColorInput,
  Divider,
  Fieldset,
  Group,
  NumberInput,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useForm } from "@mantine/form";

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
  additionalInformation: {
    dressCode: {
      primaryColor: string;
      secondaryColor: string;
    };
    comments: string;
  };
}

export default function FormCard(props: {
  form: ReturnType<typeof useForm<PartyForm>>;
}) {
  return (
    <Card>
      <Title order={3}>
        <Text>Invitation</Text>
      </Title>
      <Divider my="md" />
      <form onSubmit={props.form.onSubmit((values) => console.log(values))}>
        <Fieldset legend="Organizer">
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Jane Doe"
            key={props.form.key("organiser.name")}
            {...props.form.getInputProps("organiser.name")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={props.form.key("organiser.email")}
            {...props.form.getInputProps("organiser.email")}
          />
        </Fieldset>
        <Fieldset legend="Location">
          <Group>
            <TextInput
              withAsterisk
              disabled={
                !props.form.isDirty("organiser.name") ||
                !props.form.isDirty("organiser.email")
              }
              label="Street"
              placeholder="Main Boulevard"
              key={props.form.key("location.street")}
              style={{ flex: 4 }}
              {...props.form.getInputProps("location.street")}
            />
            <NumberInput
              withAsterisk
              disabled={
                !props.form.isDirty("organiser.name") ||
                !props.form.isDirty("organiser.email")
              }
              label="Street Number"
              placeholder="42"
              key={props.form.key("location.streetNumber")}
              style={{ flex: 1 }}
              {...props.form.getInputProps("location.streetNumber")}
            />
          </Group>
          <TextInput
            withAsterisk
            label="City"
            placeholder="Duckburg"
            disabled={
              !props.form.isDirty("organiser.name") ||
              !props.form.isDirty("organiser.email")
            }
            key={props.form.key("location.city")}
            {...props.form.getInputProps("location.city")}
          />
        </Fieldset>
        <Fieldset legend="Dress code">
          <ColorInput
            label={"Primary color"}
            data-testid="colorPicker PrimaryColor"
            disabled={
              !props.form.isDirty("organiser.name") ||
              !props.form.isDirty("organiser.email")
            }
            placeholder="#a1589f"
            key={props.form.key("additionalInformation.dressCode.primaryColor")}
            {...props.form.getInputProps(
              "additionalInformation.dressCode.primaryColor"
            )}
          />
          <ColorInput
            label={"Secondary color"}
            data-testid="colorPicker SecondaryColor"
            disabled={
              !props.form.isDirty("organiser.name") ||
              !props.form.isDirty("organiser.email")
            }
            placeholder="#1f97b5"
            key={props.form.key(
              "additionalInformation.dressCode.secondaryColor"
            )}
            {...props.form.getInputProps(
              "additionalInformation.dressCode.secondaryColor"
            )}
          />
        </Fieldset>
        <Fieldset legend="Additional information">
          <Textarea
            disabled={
              !props.form.isDirty("organiser.name") ||
              !props.form.isDirty("organiser.email")
            }
            label="Comments"
            placeholder=""
            key={props.form.key("comments")}
            {...props.form.getInputProps("comments")}
          />
        </Fieldset>
        <Group justify="flex-end" mt="md" grow>
          <Button
            type="submit"
            disabled={
              !props.form.isDirty("organiser.name") ||
              !props.form.isDirty("organiser.email")
            }
          >
            Preview Invitation
          </Button>
        </Group>
      </form>
    </Card>
  );
}
