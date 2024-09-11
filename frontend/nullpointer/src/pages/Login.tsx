import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import { useAuth } from "../contexts/auth";
import SignInModel from "../models/signInModel";
import { required } from "../validators/validators";

const Login: React.FC = () => {
    const formMethods = useForm();
    const navigate = useNavigate();

    const { login } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSubmit = formMethods.handleSubmit(async (data: FieldValues) => {
        const model: SignInModel = {
            username: data.username,
            password: data.password
        };

        try {
            await login(model.username, model.password);
            navigate('/');
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    });

    return (
        <div className="h-full-minus-header flex justify-center items-center flex-col">
            <div className="border w-[450px] h-[350px] py-11 px-12 shadow-xl">
                <FormProvider {...formMethods}>
                    <form
                        className="space-y-5"
                        onSubmit={(e) => e.preventDefault}
                        noValidate
                    >
                        <h1 className="text-2xl font-bold">Login</h1>

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

                            <PasswordInput
                                id="password"
                                label="Password"
                                placeholder="Insert your password"
                                showPasswordStrength={false}
                            />
                        </div>

                        <button
                            onClick={onSubmit}
                            className="min-w-full h-8 rounded-md text-white bg-cyan-500 hover:bg-cyan-600 text-xs"
                        >
                            Login
                        </button>

                        {errorMessage !== '' && (
                            <div id="error-message" className="text-red-700 text-center text-sm">{errorMessage}</div>
                        )}
                    </form>
                </FormProvider>
            </div>

            <div className="mt-10 text-sm">
                Don't have an account? <Link to="/register"><span className="text-blue-400">Register yourself</span></Link>
            </div>
        </div>
    );
};

export default Login;
