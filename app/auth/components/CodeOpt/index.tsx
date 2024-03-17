import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import React from "react"

export function CodeOpt({
  onChange
}:{
  onChange?: (newValue: string) => void
}) {
  return (
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
  )
}
