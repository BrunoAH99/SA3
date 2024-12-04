import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Registro() {
    const [nomeFuncionario, setNomeFuncionario] = useState('')
    const [nomeEPI, setNomeEPI] = useState('')
    const [idFuncionario, setIdFuncionario] = useState('')
    const [idEPI, setIdEPI] = useState('')
    const [quantidade, setquantidade] = useState('')
    const [data, setData] = useState('')
    const [statuss, setStatus] = useState('')
    const [funcionarios, setFuncionarios] = useState([])
    const [epi, setEpis] = useState([])
    const [mensagem, setMensagem] = useState('')
    const [mensagemTipo, setMensagemTipo] = useState('') // Tipo de mensagem: 'success' ou 'error'

    // Carregar funcionários e EPIs
    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/funcionarios')
                setFuncionarios(response.data)
            } catch (error) {
                console.error('Erro ao carregar funcionários:', error)
                setMensagem('Erro ao carregar funcionários.')
                setMensagemTipo('error')
            }
        }

        const fetchEpis = async () => {
            try {
                const response = await axios.get('http://localhost:3000/epi')
                setEpis(response.data)
            } catch (error) {
                console.error('Erro ao carregar EPIs:', error)
                setMensagem('Erro ao carregar EPIs.')
                setMensagemTipo('error')
            }
        }

        fetchFuncionarios()
        fetchEpis()
    }, [])



    const relatorio = async () => {
        try {
            const historico = {
                idFuncionario: idFuncionario,
                nomeFuncionario: nomeFuncionario,
                idEpi: idEPI,
                nomeEpi: nomeEPI,
                quantidade,
                data,
                statuss
            }
            const estoque = await axios.get(`http://localhost:3000/epi/${historico.idEpi}`)
            console.log(historico.idEpi)
            const estoqueAtual = estoque.data.quantidade

            let novaQuantidade = estoqueAtual

            if (historico.statuss === 'Retirada') {
                if (historico.quantidade <= estoqueAtual) {
                    novaQuantidade = estoqueAtual - historico.quantidade
                } else {
                    setMensagem('Não há estoque suficiente para a retirada.')
                    setMensagemTipo('error')
                    return
                }
            } else if (historico.statuss === 'Devolução') {
                novaQuantidade = estoqueAtual + historico.quantidade
            }

            const resposta = await axios.put(`http://localhost:3000/atualizar_epi/${historico.idEpi}`, {
                quantidade: novaQuantidade
            })

            if (resposta.status === 200) {
                setMensagem('Quantidade atualizada com sucesso!')
                setMensagemTipo('success')
            } else {
                setMensagem('Falha ao atualizar quantidade.')
                setMensagemTipo('error')
            }

            axios.post("http://localhost:3000/relatorio", historico)
        } catch (erro) {
            console.error(erro)
        }
    }

    return (
        <div className='registro_tela'>
            <h1>EPI Center</h1>
            <div className='registro_form_container'>
                <div className='registro_form' onSubmit={relatorio}>
                    <div className='registro_form_group'>
                        <label>Funcionário:</label>
                        <select
                            className='registro_form_select'
                            value={nomeFuncionario}
                            onChange={(e) => {
                                const [id, nome] = e.target.value.split(':')
                                setNomeFuncionario(nome)
                                setIdFuncionario(id)
                                console.log({ nome, id })
                            }}
                            required
                        >
                            <option value="">{nomeFuncionario}</option>
                            {funcionarios?.map(funcionario => (
                                <option key={funcionario.id} value={`${funcionario.id}:${funcionario.nome}`}>
                                    {funcionario.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='registro_form_group'>
                        <label>EPI:</label>
                        <select
                            className='registro_form_select'
                            value={nomeEPI}
                            onChange={(e) => {
                                const [id, nome] = e.target.value.split(':')
                                setNomeEPI(nome)
                                setIdEPI(id)
                                console.log({ nome, id })
                            }}
                            required
                        >
                            <option value="">{nomeEPI}</option>
                            {epi?.map(epi => (
                                <option key={epi.id} value={`${epi.id}:${epi.nome}`}>
                                    {epi.nome}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className='registro_form_group'>
                        <label>Quantidade:</label>
                        <input
                            className='registro_form_input'
                            type="number"
                            value={quantidade}
                            onChange={(e) => setquantidade(e.target.value)}
                            required
                        />
                    </div>
                    <div className='registro_form_group'>
                        <label>Data:</label>
                        <input
                            className='registro_form_input'
                            type="datetime-local"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>
                    <div className='registro_form_group'>
                        <label>Status:</label>
                        <select
                            className='registro_form_input'
                            value={statuss}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="Retirada">Retirada</option>
                            <option value="Devolução">Devolução</option>
                        </select>
                    </div>
                    <button className='registro_form_button' onClick={() => relatorio()}>Cadastrar Relatório</button>
                </div>

                {mensagem && (
                    <p style={{ color: mensagemTipo === 'success' ? 'green' : 'red' }}>
                        {mensagem}
                    </p>
                )}
            </div>
        </div>
    )
}
