import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'

export default function EpiDetalhes() {

    const { id } = useParams()
    const [epi, setEPI] = useState('')
    const [error, setError] = useState('')
    const [mensagem, setMensagem] = useState('')

    const carregarEPI = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/epi/${id}`)
            setEPI(response.data)
        } catch (error) {
            setError('Erro ao carregar EPI');
            console.error('Erro ao carregar EPI:', error.response || error)
        }
    }
    
    useEffect(() => {
        carregarEPI()
    }, [id])

    const apagarEpi = async () => {
        const senhaConfirmacao = window.prompt("Digite a senha do administrador para confirmar a exclusão:")

        if (!senhaConfirmacao) {
            setMensagem('Exclusão cancelada. Senha não fornecida.')
            return
        }

        try {
            // Envia a requisição para apagar o funcionário com a senha do administrador
            const respostaExcluir = await axios.delete(`http://localhost:3000/apagar_epi/${id}`, {
                data: { senha: senhaConfirmacao } // A senha é enviada no corpo da requisição
            })
            setMensagem(respostaExcluir.data)
        } catch (error) {
            console.error("Erro ao excluir funcionário:", error)
            setMensagem('Erro ao excluir funcionário')
        }
    }


    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            {epi ? (
                <>
                    <p>Nome: {epi.nome}</p>
                    <p>Quantidade: {epi.quantidade}</p>
                    <p>ID: {epi.id}</p>
                </>
            ) : (
                <p>EPI não encontrado.</p>
            )}

            <Link to={`/atualizar_epi/${id}`}>
                <button>Atualizar</button>
            </Link>
            <button type="button" onClick={apagarEpi}>Excluir</button>
            <Link to={`/registro/epi`}>
                <button>Registro</button>
            </Link>

        </div>
    )
}
