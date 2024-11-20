import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([])
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(null)

    const carregarFuncionarios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/funcionarios')
            setFuncionarios(Object.values(response.data))
            setLoading(false) 
        } catch (erro) {
            setError('Erro ao carregar os funcionários') 
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarFuncionarios()
    }, [])

    return (
        <div className="funcionario-list-container">
            {loading && <p className="funcionario-loading">Carregando Funcionários...</p>}

            {error && <p className="funcionario-error">{error}</p>} 

            {funcionarios.length > 0 && !loading ? (
                funcionarios.map((listaFuncionarios) => (
                    <Link to={`/funcionario/${listaFuncionarios.id}`} key={listaFuncionarios.id} className="funcionario-item">
                        <img className="icone" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-icon" />
                        <p>Nome: {listaFuncionarios.nome}</p>
                        <p>Setor: {listaFuncionarios.setor}</p>
                    </Link>
                ))
            ) : (
                !loading && <p className="funcionario-no-data">Nenhum funcionário encontrado.</p> 
            )}
        </div>
    )
}
