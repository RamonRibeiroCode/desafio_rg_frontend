import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Select from 'react-select'

import api from '../../services/api'

import './styles.css'

import chefLogo from '../../assets/chefLogo.png'

export default function UpdateRecipe() {

  const history = useHistory()
  const [nome, setNome] = useState('')
  const [categoria, setCategoria] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [modoPreparo, setModoPreparo] = useState('')
  const [porcoes, setPorcoes] = useState('')
  const [tempoPreparoMinutos, setTempoPreparoMinutos] = useState('')
  const [categoriasSelect, setCategoriasSelect] = useState([])

  async function getCategorias() {
    const resp = await api.get('/category')

    let arrayCategorias = []
    resp.data.forEach((item) => {
      arrayCategorias.push({ value: item.nome, label: item.nome, id: item.id})
    })
    setCategoriasSelect(arrayCategorias)
  }

  async function getRecipeToUpdate() {
    let idRecipe = localStorage.getItem("recipeId")
    try {
      const resp = await api.get('/recipes')
      const recipeToUpdate = resp.data.filter(recipe => {
          
        return recipe.id == idRecipe
      })

      setNome(recipeToUpdate[0].nomeReceita)
      setIngredientes(recipeToUpdate[0].ingredientes)
      setModoPreparo(recipeToUpdate[0].modo_preparo)
      setPorcoes(recipeToUpdate[0].porcoes)
      setTempoPreparoMinutos(recipeToUpdate[0].tempo_preparo_minutos)
      setCategoria(recipeToUpdate[0].nomeCategoria)

    } catch (err) {
      console.log(err)
    }  
  }

  async function handleUpdateRecipe(e) {
    e.preventDefault()

    let idRecipe = localStorage.getItem("recipeId")

    let idCategoria = categoriasSelect.filter((item =>{
      return item.value === categoria
    }))
    
    const data = {
      nome: nome,
      id_categorias: idCategoria[0].id,
      tempo_preparo_minutos: parseInt(tempoPreparoMinutos) ,
      modo_preparo: modoPreparo,
      porcoes: parseInt(porcoes) ,
      ingredientes: ingredientes,
    }  

    try {
      await api.put(`/recipes/${idRecipe}/update`, data)
      history.push('/recipes')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCategorias()
		getRecipeToUpdate()
	}, [])

  return (
    <div className="new-recipe-container">
      <div className="content">
        <section style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
          <img src={chefLogo} alt="Chef Logo" />
          <h1> Atualize Sua Receita </h1>
          <p> Atualize a sua receita do modo que você preferir! </p>
          <span style={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
            <Link className="back-link" to="/recipes">
              <FiArrowLeft size={16} color="#e02041" />
            Voltar para Receitas
          </Link>
          </span>

        </section>
        <form onSubmit={handleUpdateRecipe}>
          <input style={{marginBottom: "8px"}} placeholder="Nome da Receita" value={nome} onChange={e => setNome(e.target.value)} />
          <Select onChange={(categoria) => {
            setCategoria(categoria.value)
            }} placeholder="Categorias" options={categoriasSelect} />
          <input placeholder="Ingredientes" value={ingredientes} onChange={e => setIngredientes(e.target.value)} />
          <input min="1" type="number" placeholder="Tempo de Preparo" value={tempoPreparoMinutos} onChange={e => setTempoPreparoMinutos(e.target.value)} />
          <textarea placeholder="Modo de Preparo" value={modoPreparo} onChange={e => setModoPreparo(e.target.value)} />
          <input min="1" type="number" placeholder="Porções" value={porcoes} onChange={e => setPorcoes(e.target.value)} />

          <button className="button" type="submit"> Atualizar </button>

        </form>
      </div>
    </div>
  )
}