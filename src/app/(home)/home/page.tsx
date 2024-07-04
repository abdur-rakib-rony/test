import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Welcome Home</h1>
      <Link href="/login">Login</Link>
      <br />
      <Link href="/register">Register</Link>
    </div>
  );
};

export default Home;
