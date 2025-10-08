"use client";

import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function OTPForm({ email }: { email: string }) {
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
              required
              containerClassName="gap-4 text-center"
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
