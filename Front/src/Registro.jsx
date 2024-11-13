import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Registro() {
    const [nomeFuncionario, setNomeFuncionario] = useState('')
    const [nomeEPI, setNomeEPI] = useState('')
    const [idFuncionario, setIdFuncionario] = useState('')
    const [idEPI, setIdEPI] = useState('')
    const [quantidade, setquantidade] = useState('')
    const [data, setData] = useState('')
    const [status, setStatus] = useState('')
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
                status
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
                                console.log({nome, id})     
                            }}
                            required
                        >
                            <option value="">Selecione um funcionário</option>
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
                                console.log({nome, id})                                
                            }}
                            required
                        >
                            <option value="">Selecione um EPI</option>
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
                        <input
                            className='registro_form_input'
                            type="number"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        />
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
    );
}
