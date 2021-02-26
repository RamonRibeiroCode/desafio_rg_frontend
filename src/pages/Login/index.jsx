import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { toast, ToastContainer} from 'react-toastify'
import api from '../../services/api'

import './styles.css';

import chefLogo from '../../assets/chefLogo.png';
import chefBanner from '../../assets/chefBanner.png';

export default function Logon() {
  const history = useHistory()
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const resp = await api.post(`/signin`, {
        login: login,
        senha: senha,
      })
      api.defaults.headers.common['Authorization'] = `Bearer ${resp.data.token}`
      localStorage.setItem("userData", resp.data.nome)
      localStorage.setItem("token", resp.data.token)
      history.push('/recipes')
    } catch (err) {
      toast.error('Falha no Login!')
    }
  }

  return (
    <div className="logon-container">
      <ToastContainer />
      <img className="chefBanner" src={chefBanner} alt="chefBanner" />
      <section className="form">

        <img className="chefLogo" src={chefLogo} alt="chefLogo" />

        <form onSubmit={handleLogin}>
          <h1>Entrar</h1>
          <input
            style={{ marginBottom: "1%" }}
            placeholder="Login"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#1d458a" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

    </div>
  );
}