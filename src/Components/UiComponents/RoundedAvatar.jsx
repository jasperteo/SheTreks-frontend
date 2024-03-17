export default function RoundedAvatar({ image }) {
  return (
    <img
      className="avatar mb-2 h-8 w-8 rounded-full"
      src={image}
      alt="Avatar"
    />
  );
}
