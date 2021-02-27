import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import chefLogo from '../../assets/chefLogo.png'

export default function NewIncident() {
  const [nome, setNome] = useState('')
  const [categoria, setCategoria] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [modoPreparo, setModoPreparo] = useState('')
  const [porcoes, setPorcoes] = useState(null)
  const [tempoPreparoMinutos, setTempoPreparoMinutos] = useState(null)

  const history = useHistory()

  async function handleNewIncident(e) {
    e.preventDefault()

    let pad = function(num) { 
      return ('00' + num).slice(-2)
    }

    let date = new Date()
      date = date.getUTCFullYear() + '-' +
      pad(date.getUTCMonth() + 1) + '-' +
      pad(date.getUTCDate()) + ' ' +
      pad(date.getUTCHours()) + ':' +
      pad(date.getUTCMinutes()) + ':' +
      pad(date.getUTCSeconds())

    const data = {
      nome: nome,
      id_categorias: 1,
      tempo_preparo_minutos: tempoPreparoMinutos,
      modo_preparo: modoPreparo,
      porcoes: porcoes,
      ingredientes: ingredientes,
      criado_em: date,
      alterado_em: date
    }   

    try {
      await api.post("/recipes", data)
      history.push('/recipes')
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
          <img src={chefLogo} alt="Be The Hero" />
          <h1> Cadastrar Nova Receita </h1>
          <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p>
          <span style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
            <Link className="back-link" to="/recipes">
              <FiArrowLeft size={16} color="#e02041" />
            Voltar para Receitas
          </Link>
          </span>

        </section>
        <form onSubmit={handleNewIncident}>
          <input placeholder="Nome da Receita" value={nome} onChange={e => setNome(e.target.value)} />
          <input placeholder="Categoria" value={categoria} onChange={e => setCategoria(e.target.value)} />
          <input placeholder="Ingredientes" value={ingredientes} onChange={e => setIngredientes(e.target.value)} />
          <input min="1" type="number" placeholder="Tempo de Preparo" value={tempoPreparoMinutos} onChange={e => setTempoPreparoMinutos(e.target.value)} />
          <textarea placeholder="Modo de Preparo" value={modoPreparo} onChange={e => setModoPreparo(e.target.value)} />
          <input min="1" type="number" placeholder="Porções" value={porcoes} onChange={e => setPorcoes(e.target.value)} />

          <button className="button" type="submit"> Cadastrar </button>

        </form>
      </div>
    </div>
  )
}