import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../../api/useLoginUser";
import type { RegisterInput } from "@react-tech-stack/shared";
import { useLoginState } from "../../provider/LoginStateProvider";

export function LoginView() {
  const { isPending, error } = useLoginUser();
  const { login } = useLoginState();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const user = formData.get("user") as string;
      const data: RegisterInput = {
        username: user,
        email: user,
        password: formData.get("password") as string,
      };
      login(data);
    },
    [login],
  );

  return (
    <>
      <h1>React Tech Stack</h1>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="user">Username / E-Mail</label>
        <InputText id="user" name="user" />
        <label htmlFor="password">Password</label>
        <InputText id="password" type="password" />
        {error && <p style={{ color: "red" }}>{error.message}</p>}
        <Button
          label={isPending ? "Loading..." : "Login"}
          type="submit"
          disabled={isPending}
        />
      </form>
      <Button label="Switch to Register" onClick={() => navigate("/register")} />
    </>
  );
}
