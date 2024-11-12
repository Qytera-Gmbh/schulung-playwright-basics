import { Divider, Modal, Progress, Space, Text, Title } from "@mantine/core";
import { DateValue } from "@mantine/dates";
import { PartyForm } from "../../cards/FormCard";
import "./modal.css";

export default function InvitationModal(props: {
  opened: boolean;
  data: PartyForm | null;
  onClose: () => void;
  selectedDay: DateValue;
  selectedTime: DateValue;
}) {
  if (!props.data) {
    return null;
  }

  return (
    <Modal
      opened={props.opened}
      onClose={props.onClose}
      // title={<Title order={2}>About Mantine Theme Builder</Title>}
      title={
        <Title order={3} data-testid="header-invitation-modal">
          You're Invited to a Night of Fun and Festivities! 🥳
        </Title>
      }
      size={"xl"}
      centered
      // scrollAreaComponent={ScrollArea.Autosize}
      styles={{ content: { paddingTop: "0rem" } }}
    >
      <Space h="lg" />
      <Title order={4}>👋 Host</Title>
      <Text data-testid="name-host">Name: {props.data.host.name}</Text>
      <Text data-testid="mail-host">
        Contact: <a href={`mailto:${props.data.host.email}`}>{props.data.host.email}</a>
      </Text>
      <Divider my="md" />
      <Title order={4}>🗺 When & Where</Title>
      <Text>
        <Text span>Location: </Text>
        <Text span data-testid="whenwhere-city">
          {props.data.location.city}
        </Text>
        <Text span data-testid="whenwhere-street">
          , {props.data.location.street}
        </Text>
        <Text span data-testid="whenwhere-street-number">
          {" "}
          {props.data.location.streetNumber}
        </Text>
      </Text>
      <Divider my="md" />
      <Title order={4}>📅 Date & Time</Title>
      <Text>
        {props.selectedDay && props.selectedTime ? (
          <>
            <Text span data-testid="date-time-local-date">
              {props.selectedDay.toLocaleDateString()}
            </Text>
            <Text span data-testid="date-time-local-time">
              {" "}
              {props.selectedTime.toLocaleTimeString()}
            </Text>
          </>
        ) : (
          "Not yet chosen"
        )}
      </Text>
      <Divider my="md" />
      <Title order={4}>💃 Dress Code</Title>
      <Text>
        <Text span>
          <Text span>Come dressed in our theme colors: </Text>
          <Text
            span
            c={props.data.dressCode.primaryColor}
            fw={500}
            data-testid="dress-code-primary-color"
          >
            {props.data.dressCode.primaryColor}
          </Text>
          <Text span> and </Text>
          <Text
            span
            c={props.data.dressCode.secondaryColor}
            fw={500}
            data-testid="dress-code-secondary-color"
          >
            {props.data.dressCode.secondaryColor}
          </Text>
          <Text span>! </Text>
          <Text span>
            Show off your creativity while rocking these colors to add to the festive vibe.
          </Text>
          <Space h="md" />
          <Progress
            size="xl"
            value={100}
            styles={{
              root: {
                borderRadius: "0",
              },
              section: {
                borderRadius: "0",
                animation: "gradient 2s ease infinite",
                background: `linear-gradient(-45deg, ${props.data.dressCode.primaryColor} 0%, ${props.data.dressCode.secondaryColor} 100%)`,
                backgroundSize: "400% 400%",
              },
            }}
          />
        </Text>
      </Text>
      {props.data.additionalInformation.comments.length > 0 ? (
        <>
          <Divider my="md" />
          <Title order={4}>Additional Details</Title>
          <Text fs="italic" data-testid="additional-details-entry">
            {props.data.additionalInformation.comments}
          </Text>
        </>
      ) : null}
    </Modal>
  );
}
