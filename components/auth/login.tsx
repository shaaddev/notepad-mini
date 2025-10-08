"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginForm } from "./login-form";

export function Login() {
  const router = useRouter();
  const [isOtpStep, setIsOtpStep] = useState(false);

  return (
    <div className="w-full space-y-8'">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="flex items-center text-neutral-400 hover:text-neutral-200 p-0 hover:bg-black/5 px-2"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Button>
        </div>

        {!isOtpStep && (
          <p className="mt-2 text-sm text-neutral-400 text-center mb-6">
            Enter your email to sign in
          </p>
        )}

        <LoginForm isOtpStep={isOtpStep} setIsOtpStep={setIsOtpStep} />
      </div>
    </div>
  );
}
