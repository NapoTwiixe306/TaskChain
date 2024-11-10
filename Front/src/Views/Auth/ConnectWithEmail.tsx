import { useState } from "react";
import { Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ConnectWithEmail: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Pour afficher les erreurs
  const navigate = useNavigate(); // Pour rediriger l'utilisateur après une connexion

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const url  = 'http://localhost:5000/api/auth/register';
    const payload = { email, password };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      // Log de la réponse brute pour déboguer
      const responseText = await response.text();
      console.log('Réponse brute :', responseText);
  
      // Vérifier si la réponse est OK
      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText); // Essayer de parser la réponse texte
          setError(errorData.message || "Une erreur est survenue.");
        } catch (e) {
          setError("Une erreur est survenue. Impossible de traiter la réponse.");
        }
        return;
      }
  
      // Si la réponse est correcte, traiter les données
      const data = JSON.parse(responseText); // Essayer de parser la réponse texte
      if (isLogin) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error('Erreur :', err);
    }
  };
  
  
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isLogin ? "Connexion" : "Inscription"} par Email
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {isLogin
              ? "Connectez-vous à votre compte"
              : "Créez un nouveau compte"}
          </p>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? (
                <>
                  <Mail className="mr-2 h-4 w-4" /> Se connecter
                </>
              ) : (
                <>
                  <User className="mr-2 h-4 w-4" /> S'inscrire
                </>
              )}
            </button>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="login"
              name="auth-mode"
              checked={isLogin}
              onChange={() => setIsLogin(true)}
              className="hidden" // Cacher le bouton radio
            />
            <label
              htmlFor="login"
              className="cursor-pointer text-sm text-gray-700 dark:text-gray-300"
            >
              Connexion
            </label>
            <input
              type="radio"
              id="signup"
              name="auth-mode"
              checked={!isLogin}
              onChange={() => setIsLogin(false)}
            />
            <label
              htmlFor="signup"
              className="cursor-pointer text-sm text-gray-700 dark:text-gray-300"
            >
              Inscription
            </label>
          </div>
          <Link
            to="/connectWithWallet"
            className="block text-sm text-center text-indigo-600 hover:text-indigo-500"
          >
            Se connecter avec un wallet
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            En vous connectant, vous acceptez nos{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Conditions d'utilisation
            </a>{" "}
            et notre{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Politique de confidentialité
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWithEmail;
