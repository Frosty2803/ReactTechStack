import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function LoginView() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <>
            <h1>React Tech Stack</h1>
            <h2>Login</h2>
            <div>
                <label htmlFor="username">Username</label>
                <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button label="Login" />
            </div>
            <Button label='Register' onClick={() => navigate('/register')}/>
        </>
    );
}