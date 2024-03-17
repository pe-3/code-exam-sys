'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import React from "react"

export function CodeOpt({
  onChange,
  name
}:{
  onChange?: (newValue: string) => void;
  name: string;
}) {
  return (
    <>
      <input type="text" name={name} style={{ display: 'none' }} />
      <InputOTP
        onChange={onChange}
        maxLength={6}
        render={({ slots }) => (
          <InputOTPGroup className="gap-2">
            {slots.map((slot, index) => (
              <React.Fragment key={index}>
                <InputOTPSlot className="rounded-md border" {...slot} />
                {/* {index !== slots.length - 1 && <>&nbsp;</>} */}
              </React.Fragment>
            ))}{""}
          </InputOTPGroup>
        )}
      />
    </>
  )
}
