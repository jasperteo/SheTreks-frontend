import {
  SignInButton,
  SignUpButton,
  SignedOut,
  SignedIn,
} from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-center *:m-3 *:self-center">
      <img src="./icons8-tourist-96.png" width="96" />
      <h1 className="text-5xl font-bold">SheTreks</h1>
      <SignedIn>
        <div className="text-xl">You are signed in</div>
      </SignedIn>
      <SignedOut>
        <div className="*:mx-3">
          <SignInButton>
            <button className="btn  btn-primary text-dark-grey">Sign In</button>
          </SignInButton>
          <SignUpButton>
            <button className="btn btn-primary text-dark-grey">Sign Up</button>
          </SignUpButton>
        </div>
      </SignedOut>
    </div>
  );
}
