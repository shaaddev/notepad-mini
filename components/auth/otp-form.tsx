"use client";

import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verify_otp } from "./action";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function OTPForm({ email }: { email: string }) {
  const [, startTransition] = useTransition();
  const router = useRouter();

  const onComplete = (value: string) => {
    const formData = new FormData();
    formData.append("pin", value);
    if (email) {
      formData.append("email", email);
    }

    startTransition(async () => {
      try {
        const res = await verify_otp(formData);

        if (res.success) {
          toast.success("Success!", {
            description: "Your account has been verified!",
          });
          router.replace("/");
          router.refresh();
        } else {
          toast.error("Error!", {
            description:
              res.message || "An error occurred while verifying your OTP.",
          });
        }
      } catch (error) {
        console.log("ERROR", error);
        toast.error("Error!", {
          description: "An error occurred while verifying your OTP.",
        });
      }
    });
  };

  return (
    <div className="w-full">
      <form className="text-center space-y-8">
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-bold">Enter verification code</h1>
            <FieldDescription>
              We sent a 6-digit code to {email}
            </FieldDescription>
          </div>
          <Field>
            <InputOTP
              maxLength={6}
              id="otp"
              name="pin"
              required
              containerClassName="gap-4 text-center"
              onComplete={onComplete}
            >
              <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:h-10 text-center">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <FieldDescription className="text-center">
              Didn&apos;t receive the code? <a href="#">Resend</a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
