import React, { useState } from "react";
import { Modal, Button } from "antd";
import ArticleForm from "./ArticleForm";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../Fire";



const ArticleModal = ({ isVisible, onClose }) => {
  // États pour stocker les valeurs des champs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fonction pour mettre à jour les champs de saisie
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
  
    try {
      await addDoc(collection(db, "articles"), {
        title,
        content,
        created_at: serverTimestamp()
      });
      alert("Article ajouté avec succès !");
      setTitle("");
      setContent("");
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article :", error);
      alert("Une erreur est survenue.");
    }
  };
  

  return (
    <Modal
      title="Nouvel Article"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Annuler
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Valider
        </Button>,
      ]}
    >
      {/* Formulaire avec gestion des champs */}
      <ArticleForm
        title={title}
        content={content}
        handleChange={handleChange}
      />
    </Modal>
  );
};

export default ArticleModal;
