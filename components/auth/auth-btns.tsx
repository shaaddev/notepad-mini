"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function LoginBtn() {
  return (
    <Link href="/login">
      <Button variant="ghost" className="w-full flex justify-start rounded-xl">
        Login
      </Button>
    </Link>
  );
}

function LogoutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
          router.refresh();
        },
        onError: () => {
          toast.error("Failed to log out");
        },
      },
    });
  };

  return (
    <Button
      variant="ghost"
      className="w-full flex justify-start rounded-xl"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}

export { LoginBtn, LogoutBtn };
