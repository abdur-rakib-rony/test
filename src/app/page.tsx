import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <div className="bg-[#0B3243]">
      <div className="container mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 py-10 min-h-screen">
        <div className="flex-1 flex flex-col justify-center px-8">
          <h1 className="text-2xl md:text-4xl font-semibold leading-tight text-white mb-4">
            Welcome to the first
            <br />
            decentralised Social Network
            <br />
            in the world
          </h1>
          <p className="text-white mb-6">
            We are the only decentralised social network that gives opportunity
            to monetise your time even if you are a normal user who doesn't
            create any content and use the earning to buy any service or goods
            from the native marketplace.
          </p>
          <Link href="/register">
            <button className="bg-[#307777] rounded-md text-white px-4 py-2">
              Register Now!
            </button>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
