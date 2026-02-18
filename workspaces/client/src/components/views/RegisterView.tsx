import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../../api/useLoginUser";
import { registerSchema, type RegisterInput } from "@react-tech-stack/shared";
import { useLoginState } from "../../provider/LoginStateProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterView() {
  const { isPending, error } = useLoginUser();
  const { login } = useLoginState();
  const { register, handleSubmit } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (data: RegisterInput) => {
      login(data);
    },
    [login],
  );

  return (
    <>
      <h1>React Tech Stack</h1>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <InputText {...register("username")} />
        <label htmlFor="email">E-Mail</label>
        <InputText id="email" {...register("email")} />
        <label htmlFor="password">Password</label>
        <InputText id="password" type="password" {...register("password")} />
        {error && <p style={{ color: "red" }}>{error.message}</p>}
        <Button
          label={isPending ? "Loading..." : "Register"}
          type="submit"
          disabled={isPending}
        />
      </form>
      <Button label="Switch to Login" onClick={() => navigate("/login")} />
    </>
  );
}
