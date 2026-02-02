import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { login, registration } from "../store/authSlice";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const dispatch = useDispatch<AppDispatch>();



  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
 
    dispatch(login(email, password)); 
  };
  const handleRegistration = (e: React.FormEvent) => { 
    e.preventDefault();
    dispatch(registration(email, password));
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">Вхід</h2>
      
      <input
        type="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
        required
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        placeholder="Пароль"
        required
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <button 
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Логін
      </button>
      
      <button 
        type="button" 
        onClick={handleRegistration}
        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
      >
        Реєстрація
      </button>
      
    </form>
  );
};

export default LoginForm;