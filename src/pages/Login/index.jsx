import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import chefLogo from '../../assets/chefLogo.png';
import chefBanner from '../../assets/chefBanner.png';

export default function Logon() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin(e) {
    e.preventDefault()

    try {
    } catch (err) {
      alert('Falha no login, tente novamente')
    }
  }

  return (
    <div className="logon-container">
      <img className="chefBanner" src={chefBanner} alt="Heroes" />
      <section className="form">

        <img className="chefLogo" src={chefLogo} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Entrar</h1>
          <input
            style={{marginBottom: "1%"}}
            placeholder="Login"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <input
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