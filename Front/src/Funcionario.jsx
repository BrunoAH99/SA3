import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

export default function FuncionarioDetalhes() {

    const { id } = useParams()
    const [funcionario, setFuncionario] = useState('')
    const [error, setError] = useState('')
    const [relatorio, setRelatorio] = useState('')
    const [mensagem, setMensagem] = useState('')

    const carregarFuncionario = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/funcionario/${id}`)
            setFuncionario(response.data)
            console.log(response.data)
        } catch (error) {
            setError('Erro ao carregar funcionário');
            console.error('Erro ao carregar funcionário:', error.response || error)
        }
    }

    const carregarRelatorio = async () => {
        const response = await axios.get(`http://localhost:3000/listar_relatorios_funcionario/${id}`)
        setRelatorio(response.data)
        console.log(response.data)
    }

    const apagarFuncionario = async () => {
        const senhaConfirmacao = window.prompt("Digite a senha do administrador para confirmar a exclusão:")

        if (!senhaConfirmacao) {
            setMensagem('Exclusão cancelada. Senha não fornecida.')
            return
        }

        try {
            // Envia a requisição para apagar o funcionário com a senha do administrador
            const respostaExcluir = await axios.delete(`http://localhost:3000/apagar_funcionario/${id}`, {
                data: { senha: senhaConfirmacao } // A senha é enviada no corpo da requisição
            })
            setMensagem(respostaExcluir.data.mensagem)
        } catch (error) {
            setMensagem('Erro ao excluir funcionário', mensagem)
        }
    }

    useEffect(() => {
        const carregarDados = async () => {
            try {
                await carregarFuncionario()
                await carregarRelatorio()
            } catch (error) {
                setError('Erro ao carregar dados do funcionário ou relatórios.')
                console.error(error)
            }
        }

        carregarDados()
    }, [id])


    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <div className="funcionario-detalhes-container">
                {funcionario ? (
                    <ul className="funcionario-detalhes-list">
                        <li className="funcionario-detalhes-item">Nome: {funcionario.nome}</li>
                        <li className="funcionario-detalhes-item">Setor: {funcionario.setor}</li>
                        <li className="funcionario-detalhes-item">Email: {funcionario.email}</li>
                        <li className="funcionario-detalhes-item">Telefone: {funcionario.telefone}</li>
                        <li className="funcionario-detalhes-item">Matrícula: {funcionario.id}</li>
                    </ul>


                ) : (
                    <p className="funcionario-not-found">Funcionário não encontrado.</p>
                )}

                <Link to={`/atualizar_funcionario/${id}`}>
                    <button>Atualizar</button>
                </Link>
                <button type="button" onClick={apagarFuncionario}>Excluir</button>
                <Link to={`/registro`}>
                    <button>Registro</button>
                </Link>
            </div>
            <div>
                <p>{relatorio.data}</p>
                <p>{relatorio.nomeEpi}</p>
                <p>{relatorio.nomeFuncionario}</p>
                <p>{relatorio.quantidade}</p>
                <p>{relatorio.status}</p>
            </div>
        </>
    )
}