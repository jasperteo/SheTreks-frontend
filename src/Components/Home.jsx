import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-center *:self-center">
      <img src="./icons8-tourist-96.png" width="96" />
      <h1 className="text-5xl font-bold">SheTreks</h1>
      <div>
        <SignInButton mode="modal">
          <button className="btn btn-primary">Sign In</button>
        </SignInButton>
        <SignUpButton>
          <button className="btn btn-primary">Sign Up</button>
        </SignUpButton>
        <UserButton afterSignOutUrl="http://localhost:5173" />
      </div>
    </div>
  );
}
