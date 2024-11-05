import React, { useState } from 'react'
import axios from 'axios'

export default function CadastrarFuncionario() {
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [email, setEmail] = useState('')
    const [setor, setSetor] = useState('')
    const [telefone, setTelefone] = useState('')
    const [mensagem, setMensagem] = useState('')

    const cadastro_funcionario = async (e) => {
        e.preventDefault()

        try {
            const resposta = await axios.post('http://localhost:3000/cadastro_funcionario', {
                nome, senha, email, setor, telefone
            })
            setMensagem(resposta.data.mensagem)
            // Limpar os campos após o cadastro
            setNome('')
            setSenha('')
            setEmail('')
            setSetor('')
            setTelefone('')
        } catch (error) {
            setMensagem('Erro ao cadastrar funcionario')
        }
    }       

    return (
        <div className="cadastrar-container">
            <h1>Cadastrar Funcionario</h1>
            <form onSubmit={cadastro_funcionario} className="cadastrar-form">
                <div>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input 
                        type="password" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                        required />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input 
                        type="number" 
                        value={telefone} 
                        onChange={(e) => setTelefone(e.target.value)} 
                        required />
                </div>
                <div>
                    <label>Setor:</label>
                    <input 
                        type="text" 
                        value={setor} 
                        onChange={(e) => setSetor(e.target.value)} 
                        required />
                </div>
                <div className="cadastrar-buttons">
                    <button>Cadastrar</button>
                </div>
                {mensagem && <p className="cadastrar-message">{mensagem}</p>}
            </form>

        </div>
    )
}
