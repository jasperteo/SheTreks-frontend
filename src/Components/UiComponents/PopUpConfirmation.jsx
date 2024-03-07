import { brGreenButton } from "../lib/ClassesName";

export default function PopUpConfirmation({
  option,
  title,
  message,
  onConfirm,
  id,
}) {
  return (
    <dialog id={id} className="modal ">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-ghost btn-sm absolute right-2 top-2">
            <iconify-icon icon="ri:close-large-fill" />
          </button>
        </form>
        <div className="mt-8 text-center font-semibold ">
          {option} {title}?
        </div>
        <div className="text-center">{message}</div>
        <div className="-mb-4 flex justify-center">
          <button
            className={`${brGreenButton} mr-4 mt-4 text-grey`}
            onClick={onConfirm}
          >
            OK
          </button>
          <form method="dialog">
            <button className="btn-grey focus:ring-green-500 btn mt-4 focus:outline-none focus:ring-2">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
