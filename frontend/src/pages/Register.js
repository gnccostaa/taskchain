import React, { useState } from 'react';
import '../assets/Register.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });
  const [userType, setUserType] = useState('funcionario'); // 'gestor' ou 'funcionario'
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://taskchain-backend.onrender.com/api/usuario', {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        tipo_usuario: userType,  // envia o tipo selecionado para o backend
      });

      console.log('Usuário registrado com sucesso:', response.data);
      alert("Cadastro realizado! Agora você pode fazer login.");
    } catch (error) {
      console.error('Erro ao registrar:', error.response?.data || error.message);
      alert("Erro no cadastro! Verifique os dados e tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <div className="register-wrapper">
        <div className="left-panel">
          <h2>Bem-vindo(a)!</h2>
          <p>Caso já tenha uma conta, faça login com suas credenciais</p>
          <Link to="/login">
            <button className="login-btn">Entrar</button>
          </Link>
        </div>
        <div className="right-panel">
          <h2>Criar Conta</h2>

          {/* Custom Radio Buttons */}
          <div className="user-type-container">
            <label className="custom-radio">
              <input
                type="radio"
                value="gestor"
                checked={userType === 'gestor'}
                onChange={handleUserTypeChange}
              />
              <span>Gestor</span>
            </label>
            <label className="custom-radio">
              <input
                type="radio"
                value="funcionario"
                checked={userType === 'funcionario'}
                onChange={handleUserTypeChange}
              />
              <span>Funcionário</span>
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
