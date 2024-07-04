"use client";
import { useRouter } from "next/navigation";
import { logoutUser } from "../actions/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
