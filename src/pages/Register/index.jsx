import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api'
import './styles.css';

import chefLogo from '../../assets/chefLogo.png';

export default function Register() {
  const [nome, setNome] = useState('')
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')

  async function handlerRegister(e) {
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

    try {
      await api.post(`/signup`, {
        nome: nome,
        login: login,
        senha: senha,
        criado_em: date,
        alterado_em: date
      })

      toast.success("Registrado com Sucesso")
      setNome('')
      setLogin('')
      setSenha('')

    } catch (err) {
      toast.error("Esse login ja existe")
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <form onSubmit={handlerRegister}>
          <input
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <input
            type="login"
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
          <button className="button" type="submit">Cadastrar</button>
        </form>
        <section style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={chefLogo} alt="Chef Logo" />
          <div>
            <h1>Cadastro</h1>
            <p>Salve suas melhores receitas, e use onde quiser!</p>
            <p>Seja o chefe que sempre sonhou.</p>

            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
          </div>

        </section>
      </div>
    </div>
  );
}