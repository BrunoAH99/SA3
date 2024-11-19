import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

export default function FuncionarioDetalhes() {

    const { id } = useParams()
    const [funcionario, setFuncionario] = useState('')
    const [error, setError] = useState('')
    const [relatorio, setRelatorio] = useState([])
    const [mensagem, setMensagem] = useState('')

    const carregarFuncionario = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/funcionario/${id}`)
            setFuncionario(response.data)
        } catch (error) {
            setError('Erro ao carregar funcionário')
            console.error('Erro ao carregar funcionário:', error.response || error)
        }
    }

    const carregarRelatorio = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/listar_relatorios_funcionario/${id}`)
            setRelatorio(response.data)
            console.log(response.data)
        } catch (error) {
            setError('Erro ao carregar relatório')
            console.error('Erro ao carregar relatório:', error)
        }
    }

    const apagarFuncionario = async () => {
        const senhaConfirmacao = window.prompt("Digite a senha do administrador para confirmar a exclusão:")

        if (!senhaConfirmacao) {
            setMensagem('Exclusão cancelada. Senha não fornecida.')
            return
        }

        try {
            const respostaExcluir = await axios.delete(`http://localhost:3000/apagar_funcionario/${id}`, {
                data: { senha: senhaConfirmacao }
            })
            setMensagem(respostaExcluir.data.mensagem)
        } catch (error) {
            setMensagem('Erro ao excluir funcionário')
            console.error('Erro ao excluir funcionário:', error)
        }
    }

    useEffect(() => {
        const carregarDados = async () => {
            try {
                await carregarFuncionario()
            } catch (error) {
                setError('Erro ao carregar dados do funcionário ou relatórios.')
                console.error(error)
            }
        }
        carregarDados()        
        carregarRelatorio()
    }, [id])

    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <div className="funcionario-detalhes-container">
                {funcionario ? (
                    <ul className="funcionario-detalhes-list">
                        <img className='icone2' src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-icon"></img>
                        <li className="funcionario-detalhes-item">Nome: {funcionario.nome}</li>
                        <li className="funcionario-detalhes-item">Setor: {funcionario.setor}</li>
                        <li className="funcionario-detalhes-item">Email: {funcionario.email}</li>
                        <li className="funcionario-detalhes-item">Telefone: {funcionario.telefone}</li>
                        <li className="funcionario-detalhes-item">Matrícula: {funcionario.id}</li>
                    </ul>
                ) : (
                    <p className="funcionario-not-found">Funcionário não encontrado.</p>
                )}
                <div className="botoes-container">
                    <Link to={`/atualizar_funcionario/${id}`}>
                        <button className="funcionario-form-button">Atualizar</button>
                    </Link>
                    <Link to={`/registro`}>
                    <button className="funcionario-form-button3">Registro</button>
                    </Link>
                    <button className="funcionario-form-button2" type="button" onClick={apagarFuncionario}>Excluir</button>
                </div>
            </div>

            <div className="funcionario-detalhes-container">
                <h3>Relatório de Movimentação de EPIs</h3>
                {relatorio.length > 0 ? (
                    relatorio.map((item, index) => (
                        <div key={index} className="funcionario-detalhes-list">
                            <p>Data: {item.data}</p>
                            <p>Nome do EPI: {item.nomeEpi}</p>
                            <p>Nome do Funcionário: {item.nomeFuncionario}</p>
                            <p>Quantidade: {item.quantidade}</p>
                            <p>Status: {item.status}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum relatório encontrado para este funcionário.</p>
                )}
            </div>

            {mensagem && <p>{mensagem}</p>}
        </>
    )
}
