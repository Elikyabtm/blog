import { useState, useEffect } from "react";
import reactLogo from "./assets/elkprodz.png";
import AddButton from "./components/AddButton";
import ArticleModal from "./components/ArticleModal";
import ArticleCard from "./components/ArticleCard";
import db from "./Fire";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";
import { Spin } from "antd";


function App() {
  const [isArticleModalVisible, setIsArticleModalVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleDeleteArticle = (id) => {
    setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
  };
  
  const showModal = () => {
    setIsArticleModalVisible(true);
  };

  const handleClose = () => {
    setIsArticleModalVisible(false);
  };
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const articlesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(articlesList);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticles();
  }, []);
  

  return (
    <div className="app-container">
      <div>
        <a href="https://soundcloud.com/elkprodz" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="Konbini logo" />
        </a>
      </div>

      <h2>Bienvenue sur le blog de musique !</h2>

      <AddButton title="Rédiger un article" onClick={showModal} />

      <ArticleModal isVisible={isArticleModalVisible} onClose={handleClose} />

      <h2>Articles publiés</h2>
{loading ? (
  <Spin size="large" />
) : articles.length === 0 ? (
  <p>Aucun article pour le moment.</p>
) : (
  articles.map(article => (
    <ArticleCard key={article.id} article={article} onDelete={handleDeleteArticle} />
  ))
  
)}

    </div>
  );
}

export default App;
