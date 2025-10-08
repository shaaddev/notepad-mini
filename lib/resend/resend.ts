"use server";

import React from "react";
import { Resend } from "resend";
import OtpEmail from "@/emails/otp-link";

const resend = new Resend(process.env.RESEND_API_KEY);

export const email_otp_message = async (email: string, pin: string) => {
  try {
    await resend.emails.send({
      from: "Notes <notes@shaaddev.com>",
      to: [email],
      subject: `One-Time Password Verification`,
      react: React.createElement(OtpEmail, {
        email: email as string,
        pin: pin as string,
      }),
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
