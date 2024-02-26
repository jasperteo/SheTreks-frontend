import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  ParticipantView,
  StreamTheme,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

export default function Video() {
  const apiKey = "mmhfdzb5evj2"; // the API key can be found in the "Credentials" section
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTWFyYV9KYWRlIiwiaXNzIjoiaHR0cHM6Ly9wcm9udG8uZ2V0c3RyZWFtLmlvIiwic3ViIjoidXNlci9NYXJhX0phZGUiLCJpYXQiOjE3MDg3NTc4ODQsImV4cCI6MTcwOTM2MjY4OX0.cCidUCjZsSK8gFA9R-e0WQ52h48aMhDiSsLFGFgm38M"; // the token can be found in the "Credentials" section
  const userId = "Mara_Jade"; // the user id can be found in the "Credentials" section
  const callId = "fhpL3X6Hb4Dq"; // the call id can be found in the "Credentials" section

  // set up the user object
  const user = {
    id: userId,
    name: "Oliver",
    image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
  };

  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call("default", callId);
  call.join({ create: true });

  const MyUILayout = () => {
    const call = useCall();

    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) {
      return <div>Loading...</div>;
    }

    return (
      <StreamTheme style={{ position: "relative" }}>
        <SpeakerLayout participantsBarPosition="bottom" />
        <CallControls />
      </StreamTheme>
    );
  };

  // const MyParticipantList = (props) => {
  //   const { participants } = props;
  //   return (
  //     <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
  //       {participants.map((participant) => (
  //         <div
  //           key={participant.sessionId}
  //           style={{ width: "100%", aspectRatio: "3 / 2" }}
  //         >
  //           <ParticipantView
  //             muteAudio
  //             participant={participant}
  //             key={participant.sessionId}
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  // const MyFloatingLocalParticipant = (props) => {
  //   const { participant } = props;
  //   return (
  //     <div
  //       style={{
  //         position: "absolute",
  //         top: "15px",
  //         left: "15px",
  //         width: "240px",
  //         height: "135px",
  //         boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 3px",
  //         borderRadius: "12px",
  //       }}
  //     >
  //       {participant && <ParticipantView muteAudio participant={participant} />}
  //     </div>
  //   );
  // };

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}
