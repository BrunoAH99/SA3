import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function AtualizarFuncionario() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [setor, setSetor] = useState('')
    const [telefone, setTelefone] = useState('')
    const [mensagem, setMensagem] = useState('')
    const { id } = useParams()

    const atualizar_funcionario = async (e) => {
        e.preventDefault()

        try {
            const resposta = await axios.post('http://localhost:3000/cadastro_funcionario', {
                nome, senha, email, setor, telefone
            })
            setMensagem(resposta.data.mensagem)
            // Limpar os campos após o cadastro
            setNome('')
            setEmail('')
            setSetor('')
            setTelefone('')
        } catch (error) {
            setMensagem('Erro ao cadastrar funcionario')
        }
    }

    const atualizarFuncionario = async () => {
        try {
            const resposta = await axios.put(`http://localhost:3000/atualizar_funcionario/${id}`, {
                nome, setor, telefone, email
            })
            setMensagem(resposta.data.mensagem)
        } catch (error) {
            console.error("Erro ao atualizar funcionario:", error)
            setMensagem('Erro ao atualizar funcionario')
        }
    }

    return (
        <div className="cadastrar-container">
            <h1>Cadastrar Funcionario</h1>
            <form onSubmit={atualizar_funcionario} className="cadastrar-form">
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
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
                    <button type="button" onClick={atualizarFuncionario}>Atualizar</button>
                </div>
            </form>

            {mensagem && <p className="cadastrar-message">{mensagem}</p>}
        </div>
    );
}
