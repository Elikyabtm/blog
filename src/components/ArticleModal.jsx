import React, { useState } from "react";
import { Modal, Button } from "antd";
import ArticleForm from "./ArticleForm";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../Fire";

const ArticleModal = ({ isVisible, onClose, onArticleAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [genre, setGenre] = useState("");



  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    } else if (name === "imageUrl") {
      setImageUrl(value);
    }
  };


  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !imageUrl.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await addDoc(collection(db, "articles"), {
        title,
        content,
        imageUrl,
        created_at: serverTimestamp()
      });

      alert("Article ajouté avec succès !");
      setTitle("");
      setContent("");
      setImageUrl("");

      if (onArticleAdded) {
        onArticleAdded(); 
      }

      onClose(); 
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
<Modal
  title="Rédige ton article"
  open={isVisible}
  onCancel={onClose}
  className="article-modal"  
  footer={[
    <Button key="back" onClick={onClose} className="cancel-button">
      Annuler
    </Button>,
    <Button key="submit" onClick={handleSubmit} className="save-button">
      Valider
    </Button>,
  ]}
>

<ArticleForm
  title={title}
  content={content}
  genre={genre}
  handleChange={handleChange}
/>

    </Modal>
  );
};

export default ArticleModal;
