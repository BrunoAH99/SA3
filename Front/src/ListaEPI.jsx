import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function EPIs() {
  const [epis, setEPIs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const carregarEPIs = async () => {
    const response = await axios.get(`http://localhost:3000/epi`)
    setEPIs(Object.values(response.data))
    console.log(response.data)
  }

  useEffect(() => {
    carregarEPIs()
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredEPIs = epis.filter((epi) =>
    epi.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="lista-list-container">
      <div>
        <input className='barra-pesquisa'
          type="text"
          placeholder="Pesquisar por nome do EPI:"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {filteredEPIs.length > 0 ? (
        filteredEPIs.map((listaEPIs, key) => (
          <div key={key} className="lista-item">
            <Link to={`/epi/${listaEPIs.id}`} className="lista-link">
              <p>EPI: {listaEPIs.nome}</p>
              <p>Quantidade: {listaEPIs.quantidade}</p>
            </Link>
          </div>
        ))
      ) : (
        <p>Nenhum EPI encontrado.</p>
      )}
    </div>
  )
}