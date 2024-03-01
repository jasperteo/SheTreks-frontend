export default function FeedHeader() {
  return (
    <div>
      <div className="flex items-center ">
        <img src="/icons8-tourist-96.png" className="h-16 w-16" />
        <div className="ml-2 font-semibold">SheTreks</div>
        <iconify-icon icon="ri:chat-4-line" className="items-end" />
      </div>
    </div>
  );
}
