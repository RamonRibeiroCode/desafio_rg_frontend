import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi'
import chefLogo from '../../assets/chefLogo.png'
import api from '../../services/api'
import { toast } from 'react-toastify'
import './styles.css'

export default function Recipes() {

	const [recipes, setRecipes] = useState([])
	const [visibleRecipes, setVisibleRecipes] = useState([])
	const [search, setSearch] = useState('')

	const history = useHistory()
	const userData = localStorage.getItem('userData')

	async function getRecipes() {
		try {
			await api.get("/recipes")
        .then((resp) => {
          setRecipes(resp.data)
          const filteredRecipes = recipes.filter(recipe => {
            return recipe.nomeReceita.toLowerCase().includes(search.toLowerCase().trim())
          })
      
          setVisibleRecipes(filteredRecipes)
        })
			
		} catch {
			toast.error("Não foi possivel resgatar suas receitas")
		}
	}

	function updateRecipe(id) {
		localStorage.setItem('recipeId', id)
		history.push('/updateRecipe')
	}

	async function deleteRecipe(id) {
		try {
			await api.delete(`/recipes/${id}`)
        	toast.success("Receita deletada com sucesso")
        	getRecipes()

		} catch (err) {
			toast.error(err.msg)
		}
	}

	useEffect(() => {
		getRecipes()
	}, [search, visibleRecipes])

	function handleLogout() {
		localStorage.clear()
		api.defaults.headers.common['Authorization'] = ''
		history.push('/')
	}

	return (
		<div className="recipe-container">
			<header>
				<img src={chefLogo} alt="Chef Logo" />
				<span> Bem-vindo, {userData} </span>

				<Link className="button" to="/newRecipe"> Cadastrar nova Receita </Link>
				<button onClick={handleLogout} type="button">
					<FiPower size={18} color="1d458a" />
				</button>
			</header>
			<div className="search-container">
				<input
					className="searchInput"
					placeholder="Pesquisar por nome"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>

			<h1 style={{marginTop: "4%"}}> Receitas Cadastradas </h1>
			<ul>
				{visibleRecipes.map(recipe => (
					<li key={recipe.id}>
						<strong> RECEITA: </strong>
						<p> {recipe.nomeReceita} </p>

						<strong> CATEGORIA: </strong>
						<p> {recipe.nomeCategoria} </p>

						<strong> CRIADO EM: </strong>
						<p> {moment(recipe.criado_em).format('DD/MM/YYYY HH:MM')} </p>

						<strong> TEMPO DE PREPARO: </strong>
						<p> {recipe.tempo_preparo_minutos} minutos </p>

						<strong> INGREDIENTES: </strong>
						<p> {recipe.ingredientes} </p>

						<strong> MODO DE PREPARO: </strong>
						<p> {recipe.modo_preparo} </p>

						<strong> PORÇÕES: </strong>
						<p> {recipe.porcoes} </p>

						<button onClick={() => deleteRecipe(recipe.id)} type="button">
							<FiTrash2
								size={20}
								color="#b20000"
							/>
						</button>
						<button style={{marginRight: "5%"}}  onClick={() => updateRecipe(recipe.id)} type="button">
							<FiEdit
								size={20}
								color="#dab600"
							/>
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}