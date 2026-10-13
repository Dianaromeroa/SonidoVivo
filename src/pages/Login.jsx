import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [correo, setCorreo] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const { iniciarSesion } = useAuth(); const navegar = useNavigate(); const ubicacion = useLocation();
  function enviar(event) { event.preventDefault(); setError(""); if (!correo || !password) { setError("Completa correo y contraseña."); return; } const usuario = iniciarSesion(correo, password); if (!usuario) { setError("Credenciales incorrectas."); return; } navegar(ubicacion.state?.from?.pathname || (usuario.rol === "ADMIN" ? "/admin" : "/vendedor")); }
  return <section className="auth"><form className="formulario" onSubmit={enviar} noValidate><p className="eyebrow">Acceso al sistema</p><h1>Iniciar sesión</h1><p>Para la demostración: <strong>admin@sonidovivo.cl / admin123</strong> o <strong>vendedor@sonidovivo.cl / vendedor123</strong>.</p><label>Correo<input type="email" value={correo} onChange={(event) => setCorreo(event.target.value)} /></label><label>Contraseña<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <p className="mensaje error" role="alert">{error}</p>}<button className="boton" type="submit">Ingresar</button></form></section>;
}