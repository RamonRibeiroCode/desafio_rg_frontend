import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import chefLogo from '../../assets/chefLogo.png'
import api from '../../services/api'
import { toast } from 'react-toastify'
import './styles.css'

export default function Profile() {

	const [recipes, setRecipes] = useState([])
	const history = useHistory()
	const userData = localStorage.getItem('userData')

	async function getRecipes() {
		try {
			let token = localStorage.getItem("token")
			api.defaults.headers.common['Authorization'] = `Bearer ${token}`
			const resp = await api.get("http://localhost:3003/recipes")
			setRecipes(resp.data)
		} catch {
			toast.error("Não foi possivel resgatar suas receitas")
		}
		
	}

	function deleteRecipe(id) {
		console.log('Ola')
	}

	useEffect(() => {
		getRecipes()
	}, [])

	function handleLogout() {
		localStorage.clear()
		api.defaults.headers.common['Authorization'] = ''
		history.push('/')
	}

	return (
		<div className="profile-container">
			<header>
				<img src={chefLogo} alt="Chef Logo" />
				<span> Bem-vindo, {userData} </span>

				<Link className="button" to="/newRecipe"> Cadastrar novo caso </Link>
				<button onClick={handleLogout} type="button">
					<FiPower size={18} color="1d458a" />
				</button>
			</header>
			<h1> Casos Cadastrados </h1>
			<ul>
				{recipes.map(recipe => (
					<li key={recipe.id}>
						<strong> CASO: </strong>
						<p> {recipe.nome} </p>

						<strong> id_categorias: </strong>
						<p> {recipe.id_categorias} </p>

						<strong> INGREDIENTES: </strong>
						<p> {recipe.ingredientes} </p>

						<strong> DATA: </strong>
						<p> {recipe.criado_em} </p>

						<strong> PORÇÕES: </strong>
						<p> {recipe.porcoes} </p>

						<button className="deleteIcon" onClick={() => deleteRecipe(recipe.id)} type="button">
							<FiTrash2 
								size={20} 
								color="#a8a8b3" 
							/>
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}