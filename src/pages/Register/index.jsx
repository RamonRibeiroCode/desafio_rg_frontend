import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import chefLogo from '../../assets/chefLogo.png';

export default function Register() {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  async function handlerRegister(e) {
    e.preventDefault();

    const data = {
      nome,
      login,
      senha,
    }

    try {

    } catch (err) {
      alert('Erro no cadastro, tente novamente');
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
        <section style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
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