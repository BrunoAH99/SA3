import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const carregarFuncionarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/funcionarios')
      setFuncionarios(Object.values(response.data))
      setLoading(false)
    } catch (erro) {
      console.error('Erro ao carregar os dados dos funcionários', erro) // Logar o erro no console para depuração
      setError('Erro ao carregar os dados dos funcionários')
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarFuncionarios()
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredFuncionarios = funcionarios.filter((funcionario) =>
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="funcionario-list-container">
      <div>
        <input className='barra-pesquisa'
          type="text"
          placeholder="Pesquisar funcionário pelo nome:"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading && <p>Carregando os funcionários...</p>}

      {error && <p>{error}</p>}

      {filteredFuncionarios.length > 0 && !loading ? (
        filteredFuncionarios.map((listaFuncionarios) => (
          <Link to={`/funcionario/${listaFuncionarios.id}`} key={listaFuncionarios.id} className="funcionario-item">
            <img className="icone" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-icon" />
            <p>Nome: {listaFuncionarios.nome}</p>
            <p>Setor: {listaFuncionarios.setor}</p>
          </Link>
        ))
      ) : (
        !loading && <p>Nenhum funcionário encontrado.</p>
      )}
    </div>
  )
}