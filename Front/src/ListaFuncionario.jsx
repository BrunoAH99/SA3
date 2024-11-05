import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([])

    const carregarFuncionarios = async () => {
        const response = await axios.get(`http://localhost:3000/funcionarios`)
        setFuncionarios(Object.values(response.data))
        console.log(response.data)
    }

    useEffect(() => {
        carregarFuncionarios()
    }, [])

    return (
        <div className="funcionario-list-container">
            {funcionarios.length > 0 ? (
                funcionarios.map((listaFuncionarios, key) => (
                    <Link to={`/funcionario/${listaFuncionarios.id}`} key={key} className="funcionario-item">
                        <p>Nome: {listaFuncionarios.nome}</p>
                        <p>Setor: {listaFuncionarios.setor}</p>
                    </Link>
                ))
            ) : (
                <p className="funcionario-loading">Carregando Funcionarios...</p>
            )}
        </div>
    );
}