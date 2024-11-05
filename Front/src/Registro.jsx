import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function Registro() {
    const [nomeFuncionario, setNomeFuncionario] = useState('')
    const [nomeEPI, setNomeEPI] = useState('')
    const [qtd, setQtd] = useState('')
    const [data, setData] = useState('')
    const [funcionarios, setFuncionarios] = useState([])
    const [epis, setEpis] = useState([])

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/funcionarios')
                setFuncionarios(response.data)
            } catch (error) {
                console.error('Erro ao carregar funcionários:', error)
            }
        }

        const fetchEpis = async () => {
            try {
                const response = await axios.get('http://localhost:3000/epi')
                console.log(response.data)
                setEpis(response.data)
            } catch (error) {
                console.error('Erro ao carregar EPIs:', error)
            }
        }

        fetchFuncionarios()
        fetchEpis()
    }, [])

    return (
        <div className='registro_tela'>
            <h1>EPI Center</h1>
            <div className='registro_form_container'>
                <form className='registro_form'>
                    <div className='registro_form_group'>
                        <label>Funcionário:</label>
                        <select
                            className='registro_form_select'
                            value={nomeFuncionario}
                            onChange={(e) => setNomeFuncionario(e.target.value)}
                            required
                        >
                            <option value="">Selecione um funcionário</option>
                            {funcionarios?.map(funcionario => (
                                <option key={funcionario.id} value={funcionario.id}>
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
                            onChange={(e) => setNomeEPI(e.target.value)}
                            required
                        >
                            <option value="">Selecione um EPI</option>
                            {epis?.map(epi => (
                                <option key={epi.id} value={epi.id}>
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
                            value={qtd}
                            onChange={(e) => setQtd(e.target.value)}
                            required
                        />
                    </div>
                    <div className='registro_form_group'>
                        <label>Data:</label>
                        <input
                            className='registro_form_input'
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>
                    <button className='registro_form_button' type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}
