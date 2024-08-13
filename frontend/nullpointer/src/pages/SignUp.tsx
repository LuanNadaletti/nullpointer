import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import SignUpModel from "../models/signUpModel";
import { signUp } from "../services/authenticationService";
import { required, validateEmail } from "../validators/validators";

const SignUp = () => {
  const formMethods = useForm();

  const onSubmit = formMethods.handleSubmit((data: FieldValues) => {
    const model: SignUpModel = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    signUp(model);
  });

  return (
    <div className="h-full-minus-header flex justify-center items-center">
      <div className="border w-[450px] h-[530px] py-16 px-12 shadow-xl">
        <FormProvider {...formMethods}>
          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault}
            noValidate
          >
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-xs text-slate-400">
              By clicking “Sign up”, you agree to our terms of service and
              acknowledge you have read our privacy policy.
            </p>

            <div>
              <Input
                id="username"
                name="username"
                label="Username"
                placeholder="Insert your username"
                type="text"
                validation={{
                  required,
                }}
              />

              <Input
                id="email"
                name="email"
                label="Email"
                placeholder="Insert your email"
                type="text"
                validation={{
                  required,
                  validate: {
                    email: validateEmail(),
                  },
                }}
              />

              <PasswordInput
                id="password"
                label="Password"
                placeholder="Insert your password"
              />
            </div>

            <button
              onClick={onSubmit}
              className="min-w-full h-8 rounded-md text-white bg-cyan-500 hover:bg-cyan-600 text-xs"
            >
              Sign up
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SignUp;
