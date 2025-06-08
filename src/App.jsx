import { useState, useEffect } from "react";
import reactLogo from "./assets/logo.png";
import AddButton from "./components/AddButton";
import ArticleModal from "./components/ArticleModal";
import ArticleCard from "./components/ArticleCard";
import { db } from "./Fire";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";
import { Spin, Input, Select } from "antd";

const { Option } = Select;

function App() {
  const [isArticleModalVisible, setIsArticleModalVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleDeleteArticle = (id) => {
    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== id)
    );
  };

  const showModal = () => {
    setIsArticleModalVisible(true);
  };

  const handleClose = () => {
    setIsArticleModalVisible(false);
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const articlesList = querySnapshot.docs.map((doc) => ({
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

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.id.includes(searchTerm)) &&
      (selectedGenre === "" || article.genre === selectedGenre)
  );

  return (
    <div className="app-container">
     <header className="header">
  <div className="header-inner">
    <div className="header-left">
      <a href="index.html"><img src="/src/assets/logo.png" alt="Logo" className="logo-blog" /></a>
    </div>

    <div className="header-controls">
      <Input
        placeholder="Rechercher..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select
        placeholder="Genre"
        onChange={(value) => setSelectedGenre(value)}
        allowClear
      >
        <Option value="Action">Action</Option>
        <Option value="Drame">Drame</Option>
        <Option value="Comédie">Comédie</Option>
        <Option value="Thriller">Thriller</Option>
        <Option value="Science-fiction">Science-fiction</Option>
        <Option value="Romance">Romance</Option>
      </Select>
      <AddButton title="Créer un article" onClick={showModal} />
    </div>
  </div>
</header>
<div className="blog-intro">
  <p>Bienvenue sur <strong>Entre Deux Épisodes</strong> – Le blog 100% séries pour passionnés de Netflix, Prime et plus encore !</p>
</div>

      <ArticleModal
        isVisible={isArticleModalVisible}
        onClose={handleClose}
        onArticleAdded={fetchArticles}
      />

      <h2>Articles publiés</h2>

      {loading ? (
        <Spin size="large" />
      ) : filteredArticles.length === 0 ? (
        <p>Aucun article trouvé.</p>
      ) : (
        <div className="articles-grid">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onDelete={handleDeleteArticle}
              onArticleUpdated={fetchArticles}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
