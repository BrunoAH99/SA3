import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function EPIs() {
    const [epis, setEPIs] = useState([])

    const carregarEPIs = async () => {
        const response = await axios.get(`http://localhost:3000/epi`)
        setEPIs(Object.values(response.data))
        console.log(response.data)
    }

    useEffect(() => {
        carregarEPIs()
    }, [])

    return (
        <div className="lista-list-container">
                {epis.length > 0 ? (
                epis.map((listaEPIs, key) => (
            <div key={key} className="lista-item">
                <Link to={`/epi/${listaEPIs.id}`} className="lista-link">
                    <p>EPI: {listaEPIs.nome}</p>
                    <p>Quantidade: {listaEPIs.quantidade}</p>
                </Link>
            </div>
            ))
            ) : (
            <p className="lista-loading">Carregando EPIs...</p>
            )}
        </div>
    )
}
