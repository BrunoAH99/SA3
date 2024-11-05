import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import './index.css'
import CadastrarEPI from './CadastroEPI'
import Home from './Home'
import CadastrarFuncionario from './CadastrarFuncionario'
import Inicial from './Inicial'
import Funcionarios from './ListaFuncionario'
import Funcionario from './Funcionario'
import Registro from './Registro'
import EPIs from './ListaEPI'
import EpiDetalhes from './EPI'
import AtualizarFuncionario from './AtualizarFuncionario'
import AtualizarEPI from './AtualizarEpi'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/epi/cadastro",
    element: <CadastrarEPI />
  },
  {
    path: "/funcionario/cadastro", 
    element: <CadastrarFuncionario />,
  },
  {
    path: "/principal", 
    element: <Inicial />,
  },
  {
    path: "/lista_funcionarios",
    element: <Funcionarios/>,
  },
  {
    path: "/funcionario/:id",
    element: <Funcionario/>
  },
  {
    path: "/registro",
    element: <Registro/>,
  },{
    path: "/lista_EPIs",
    element: <EPIs/>
  },{
    path: "/epi/:id",
    element:<EpiDetalhes/>
  },{
    path: "/atualizar_funcionario/:id",
    element: <AtualizarFuncionario/>
  },{
    path:"/atualizar_epi/:id",
    element: <AtualizarEPI/>
  }


])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
