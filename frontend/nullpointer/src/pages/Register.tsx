import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/input/Input";
import PasswordInput from "../components/input/PasswordInput";
import SignUpModel from "../models/signUpModel";
import { signUp } from "../services/authenticationService";
import { required, validateEmail } from "../validators/validators";

const Register: React.FC = () => {
  const formMethods = useForm();
  const navigate = useNavigate();

  const onSubmit = formMethods.handleSubmit(async (data: FieldValues) => {
    const model: SignUpModel = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      await signUp(model);
      navigate('/login');
    } catch (error: any) {
      formMethods.setError('username', {
        type: 'manual',
        message: 'username already taken'
      });
    }
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
                showPasswordStrength={true}
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

export default Register;
