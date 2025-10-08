import { Login } from "@/components/auth/login";

export default function Page() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-neutral-300 dark:bg-neutral-950 gap-12">
      <div className="w-full max-w-xl mx-auto">
        <Login />
      </div>
    </div>
  );
}
