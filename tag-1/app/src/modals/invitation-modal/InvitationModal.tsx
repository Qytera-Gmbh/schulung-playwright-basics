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
      <Text data-testid="email-host">
        Contact: <a href={`mailto:${props.data.host.email}`}>{props.data.host.email}</a>
      </Text>
      <Divider my="md" />
      <Title order={4}>🗺 When & Where</Title>
      <Text data-testid="location">
        <Text span>Location: </Text>
        <Text span>
          {props.data.location.city}
        </Text>
        <Text span>{", "}</Text>
        <Text span>
          {props.data.location.street}
        </Text>
        <Text span> </Text>
        <Text span>
          {props.data.location.streetNumber}
        </Text>
      </Text>
      <Divider my="md" />
      <Title order={4}>📅 Date & Time</Title>
      <Text data-testid="date">
        {props.selectedDay && props.selectedTime ? (
          <>
            <Text span>
              {props.selectedDay.toLocaleDateString()}
            </Text>
            <Text span>
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
      <Text data-testid="dresscode">
        <Text span>
          <Text span>Come dressed in our theme colors: </Text>
          <Code c={props.data.dressCode.primaryColor} fw={500}>
            {props.data.dressCode.primaryColor}
          </Code>
          <Text span> and </Text>
          <Code c={props.data.dressCode.secondaryColor} fw={500}>
            {props.data.dressCode.secondaryColor}
          </Code>
          <Text span>! </Text>
          <Text span>
            Show off your creativity while rocking these colors to add to the festive vibe.
          </Text>
        </Text>
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
      {props.data.additionalInformation.comments.length > 0 ? (
        <>
          <Divider my="md" />
          <Title order={4}>Additional Details</Title>
          <Text fs="italic" data-testid="additional-comments">
            {props.data.additionalInformation.comments}
          </Text>
        </>
      ) : null}
    </Modal>
  );
}
