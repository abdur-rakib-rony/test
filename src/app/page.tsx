import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <div className="bg-[#0B3243]">
      <div className="container mx-auto flex min-h-screen flex-col space-y-4 py-10 md:flex-row md:space-y-0">
        <div className="flex flex-1 flex-col justify-center md:px-8">
          <h1 className="mb-4 text-2xl font-semibold leading-tight text-white md:text-4xl">
            Welcome to the first
            <br />
            decentralised Social Network
            <br />
            in the world
          </h1>
          <p className="mb-6 text-white">
            We are the only decentralised social network that gives opportunity
            to monetise your time even if you are a normal user who doesn&apos;t
            create any content and use the earning to buy any service or goods
            from the native marketplace.
          </p>
          <Link href="/register">
            <button className="rounded-md bg-[#307777] px-4 py-2 text-white">
              Register Now!
            </button>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
