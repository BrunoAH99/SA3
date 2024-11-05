import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita o recarregamento da página

        try {
            const response = await axios.post('http://localhost:3000/login', { email, senha })
            if (response.data.success) {
                setMensagem('Login bem-sucedido!')
                navigate('/principal')
            }
        } catch (error) {
            console.error(error)
            setMensagem('Erro ao realizar login. Tente novamente.')
        }
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label>EMAIL:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>SENHA:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
            {mensagem && <p className="login-message">{mensagem}</p>}
        </div>
    );
}
