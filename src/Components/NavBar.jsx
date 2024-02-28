export default function NavBar() {
  return (
    <>
      <div className="btm-nav">
        <button className="bg-accent">
          <iconify-icon
            inline
            icon="ri:robot-2-line"
            class="lightgrey-icon "
          ></iconify-icon>
        </button>
        <button className="bg-accent">
          <iconify-icon
            inline
            icon="ri:function-add-line"
            class="lightgrey-icon "
          ></iconify-icon>
        </button>
        <button className="bg-accent">
          <iconify-icon
            inline
            icon="ri:notification-2-line"
            class="lightgrey-icon "
          ></iconify-icon>
        </button>
        <button className="bg-accent">
          <iconify-icon
            inline
            icon="ri:calendar-event-line"
            class="lightgrey-icon"
          ></iconify-icon>
        </button>
        <button className="bg-accent">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
