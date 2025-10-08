"use client";

import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OTPForm } from "./otp-form";
import { useTransition, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

export function LoginForm({
  isOtpStep,
  setIsOtpStep,
}: {
  isOtpStep: boolean;
  setIsOtpStep: (isOtpStep: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        console.log(formData.get("email"));
        setSuccessMessage("Email sent successfully");
        setSubmittedEmail(formData.get("email") as string);
        setIsOtpStep(true);
      } catch (error) {
        setErrorMessage("Failed to send email");
        console.error(error);
      }
    });
  };

  return (
    <div className="w-full">
      {!isOtpStep ? (
        <div>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <Input
                      type="email"
                      name="email"
                      placeholder="username@example.com"
                      required
                      className="rounded-2xl"
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Field orientation="horizontal">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="rounded-2xl bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                >
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <OTPForm email={submittedEmail} />
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex">
            <div className="shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {successMessage}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
