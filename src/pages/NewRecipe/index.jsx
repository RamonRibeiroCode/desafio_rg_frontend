import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import chefLogo from '../../assets/chefLogo.png'

export default function NewIncident() {
  const [nome, setNome] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [modoPreparo, setModoPreparo] = useState('')
  const [value, setValue] = useState('')

  const history = useHistory()
  
  async function handleNewIncident(e) {
    e.preventDefault()
    const data = {
      nome,
      modoPreparo,
      ingredientes,
      value,
    }

    try {
      history.push('/recipes')
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={chefLogo} alt="Be The Hero" />
          <h1> Cadastrar Nova Receita </h1>
          <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Receitas
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input placeholder="Nome do Caso" value={nome} onChange={e => setNome(e.target.value)} />
          <input placeholder="Ingredientes" value={ingredientes} onChange={e => setIngredientes(e.target.value)} />
          <textarea placeholder="Descrição" value={modoPreparo} onChange={e => setModoPreparo(e.target.value)} />
          <input placeholder="Valor em Reais" value={value} onChange={e => setValue(e.target.value)} />
          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}