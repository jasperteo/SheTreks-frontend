import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <div>
      <img src="./icons8-tourist-96.png" />
      <div className="text-3xl">SheTreks</div>

      <SignInButton>
        <button className="btn btn-primary">Sign In</button>
      </SignInButton>
      <SignUpButton>
        <button className="btn btn-primary">Sign Up</button>
      </SignUpButton>
    </div>
  );
}
