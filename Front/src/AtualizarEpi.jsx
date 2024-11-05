import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function AtualizarEPI() {
    const [nome, setNome] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [mensagem, setMensagem] = useState('')    
    const { id } = useParams()

    const atualizar_epi = async () => {
        try {
            const resposta = await axios.put(`http://localhost:3000/atualizar_epi/${id}`, {
                nome, quantidade
            })
            setMensagem(resposta.data.mensagem)
        } catch (error) {
            console.error("Erro ao atualizar epi:", error)
            setMensagem('Erro ao atualizar epi')
        }
    }

    return (
        <div className="cadastrar-container">
            <h1>Cadastrar EPI</h1>
            <form onSubmit={atualizar_epi} className="cadastrar-form">
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                </div>
                <div className="cadastrar-buttons">
                    <button type="submit">Atualizar</button>
                </div>
            </form>
            {mensagem && <p className="cadastrar-message">{mensagem}</p>}
        </div>
    )
}
