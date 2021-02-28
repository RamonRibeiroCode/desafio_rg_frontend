import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Select from 'react-select'

import api from '../../services/api'

import './styles.css'

import chefLogo from '../../assets/chefLogo.png'

export default function NewRecipe() {
  const [nome, setNome] = useState('')
  const [categoria, setCategoria] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [modoPreparo, setModoPreparo] = useState('')
  const [porcoes, setPorcoes] = useState('')
  const [tempoPreparoMinutos, setTempoPreparoMinutos] = useState('')
  const [categoriasSelect, setCategoriasSelect] = useState([])

  const history = useHistory()

  async function getCategorias() {
    const resp = await api.get('/category')

    let arrayCategorias = []
    resp.data.forEach((item) => {
      arrayCategorias.push({ value: item.nome, label: item.nome, id: item.id })
    })
    setCategoriasSelect(arrayCategorias)
  }

  async function handleNewRecipe(e) {
    e.preventDefault()

    let pad = function (num) {
      return ('00' + num).slice(-2)
    }

    let date = new Date()
    date = date.getUTCFullYear() + '-' +
      pad(date.getUTCMonth() + 1) + '-' +
      pad(date.getUTCDate()) + ' ' +
      pad(date.getUTCHours()) + ':' +
      pad(date.getUTCMinutes()) + ':' +
      pad(date.getUTCSeconds())

    let idCategoria = categoriasSelect.filter((item => {
      return item.value === categoria
    }))

    const data = {
      nome: nome,
      id_categorias: idCategoria[0].id,
      tempo_preparo_minutos: parseInt(tempoPreparoMinutos),
      modo_preparo: modoPreparo,
      porcoes: parseInt(porcoes),
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

  useEffect(() => {
    getCategorias()
  }, [])

  return (
    <div className="new-recipe-container">
      <div className="content">
        <section style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
          <img src={chefLogo} alt="Chef Logo" />
          <h1> Cadastrar Nova Receita </h1>
          <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p>
          <span style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
            <Link className="back-link" to="/recipes">
              <FiArrowLeft size={16} color="#e02041" />
              Voltar para Receitas
            </Link>
          </span>

        </section>
        <form onSubmit={handleNewRecipe}>
          <input style={{ marginBottom: "8px" }} placeholder="Nome da Receita" value={nome} onChange={e => setNome(e.target.value)} />
          <Select onChange={(categoria) => {
            setCategoria(categoria.value)
          }} placeholder="Categorias" options={categoriasSelect} />
          <input placeholder="Ingredientes" value={ingredientes} onChange={e => setIngredientes(e.target.value)} />
          <input min="1" type="number" placeholder="Tempo de Preparo Em Minutos" value={tempoPreparoMinutos} onChange={e => setTempoPreparoMinutos(e.target.value)} />
          <textarea placeholder="Modo de Preparo" value={modoPreparo} onChange={e => setModoPreparo(e.target.value)} />
          <input min="1" type="number" placeholder="Porções" value={porcoes} onChange={e => setPorcoes(e.target.value)} />

          <button className="button" type="submit"> Cadastrar </button>

        </form>
      </div>
    </div>
  )
}