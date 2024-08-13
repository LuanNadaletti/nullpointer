import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface Props {
  id: string;
  label: string;
  placeholder: string;
}

const PasswordInput = (props: Props) => {
  const [seePassword, setPassword] = useState(false);
  const [passwordPower, setPasswordPower] = useState(0);

  const { register } = useFormContext();

  function handleSeePassword() {
    setPassword(!seePassword);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newPassword = event.target.value;

    let power = 0;
    if (newPassword.length > 8) power++;
    if (/\d/.test(newPassword)) power++;
    if (/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)) power++;
    if (/\W/.test(newPassword)) power++;

    setPasswordPower(power);
  }

  return (
    <div className="flex flex-col w-full gap-1 mt-1">
      <label htmlFor={props.id} className="font-bold capitalize">
        {props.label}
      </label>

      <div className="relative">
        <input
          id={props.id}
          type={seePassword ? "text" : "password"}
          placeholder={props.placeholder}
          className="relative border rounded-lg border-gray-300 p-4 h-5 w-full text-sm text-slate-500 focus:outline-none"
          {...register(props.id, { required: true })}
          onChange={(e) => {
            handlePasswordChange(e);
            register(props.id).onChange(e);
          }}
        />

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {seePassword ? (
            <FaRegEye onClick={handleSeePassword} className="cursor-pointer" />
          ) : (
            <FaRegEyeSlash
              onClick={handleSeePassword}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      <PasswordPower power={passwordPower} />
    </div>
  );
};

interface PasswordPowerProps {
  power: number;
}

const PasswordPower = ({ power }: PasswordPowerProps) => {
  const color =
    power === 1 ? "bg-red-500" : power === 2 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="w-full h-1 bg-gray-300 rounded-lg mt-2 overflow-hidden">
      <div
        style={{ width: `${(power / 3) * 100}%` }}
        className={`h-full ${color} rounded-lg transition-all duration-500`}
      ></div>
    </div>
  );
};

export default PasswordInput;
