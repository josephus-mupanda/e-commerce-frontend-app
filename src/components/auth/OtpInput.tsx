type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const OTP_LENGTH = 6;

const OtpInput = ({ value, onChange, disabled = false }: OtpInputProps) => {
  const digits = value.padEnd(OTP_LENGTH, " ").slice(0, OTP_LENGTH).split("");

  const updateDigit = (index: number, digit: string) => {
    const nextDigits = digits.map((item) => (item === " " ? "" : item));
    nextDigits[index] = digit.replace(/\D/g, "").slice(-1);
    onChange(nextDigits.join("").slice(0, OTP_LENGTH));
  };

  return (
    <div className="flex w-full justify-center gap-2 sm:gap-3" aria-label="Verification code">
      {digits.map((digit, index) => (
        <input
          key={index}
          aria-label={`OTP digit ${index + 1}`}
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={digit.trim()}
          onChange={(event) => {
            updateDigit(index, event.target.value);
            const next = event.target.nextElementSibling as HTMLInputElement | null;
            if (event.target.value && next) next.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !digit.trim()) {
              const previous = event.currentTarget.previousElementSibling as HTMLInputElement | null;
              previous?.focus();
            }
          }}
          onPaste={(event) => {
            event.preventDefault();
            const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
            if (pasted) onChange(pasted);
          }}
          className="h-12 w-10 rounded-lg border border-white/70 bg-white/70 text-center text-lg font-black text-primeColor shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] outline-none transition focus:border-[#FF8533] focus:ring-2 focus:ring-[#FF8533]/20 disabled:opacity-60 sm:w-12"
        />
      ))}
    </div>
  );
};

export default OtpInput;
