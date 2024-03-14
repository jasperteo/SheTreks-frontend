import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export default function IndividualMap({ activity }) {
  return (
    <div style={{ height: "40vh", width: "100%" }}>
      <Map
        defaultCenter={{
          lat: activity?.latitude,
          lng: activity?.longitude,
        }}
        defaultZoom={12}
        mapId={activity?.id}
      >
        <AdvancedMarker
          key={activity?.id}
          position={{
            lat: activity?.latitude,
            lng: activity?.longitude,
          }}
          offsetLeft={-20}
          offsetTop={-10}
          title={activity?.title}
        />
      </Map>
    </div>
  );
}
