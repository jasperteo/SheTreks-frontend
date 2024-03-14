import {
  SignInButton,
  SignUpButton,
  SignedOut,
  SignedIn,
} from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className="hero min-h-screen rounded-lg bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <img
            className="mx-auto my-6"
            src="/android-chrome-192x192.png"
            width="192"
          />
          <h1 className="text-5xl font-bold text-neutral">SheTreks</h1>
          <SignedIn>
            <p className="py-6">You are signed in!</p>
          </SignedIn>
          <SignedOut>
            <div className=" py-6 *:mx-3">
              <SignInButton mode="modal">
                <button className="btn  btn-primary text-neutral">
                  Sign In <iconify-icon icon="ri:login-box-line" />
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn btn-primary text-neutral">
                  Sign Up <iconify-icon icon="ri:user-add-line" />
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
