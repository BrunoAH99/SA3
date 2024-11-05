import React, { useState } from 'react'
import axios from 'axios'

export default function CadastrarEPI() {
    const [nome, setNome] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [mensagem, setMensagem] = useState('')

    const cadastro_epi = async (e) => {
        e.preventDefault();

        try {
            const resposta = await axios.post('http://localhost:3000/cadastro_epi', {
                nome, quantidade
            })
            setMensagem(resposta.data.mensagem)
            // Limpar os campos após o cadastro
            setNome('')
            setQuantidade('')
        } catch (error) {
            console.error("Erro ao cadastrar epi:", error)
            setMensagem('Erro ao cadastrar epi')
        }
    }   

    return (
        <div className="cadastrar-container">
            <h1>Cadastrar EPI</h1>
            <form onSubmit={cadastro_epi} className="cadastrar-form">
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
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
            {mensagem && <p className="cadastrar-message">{mensagem}</p>}
        </div>
    )
}
