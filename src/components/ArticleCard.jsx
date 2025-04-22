import React from "react";
import { Card, Button } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import db from "../Fire";


const ArticleCard = ({ article, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "articles", article.id));
      onDelete(article.id); // pour mettre à jour la liste dans App.jsx
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  return (
    <Card
      title={article.title}
      style={{ marginBottom: 16 }}
      extra={
        <Button danger onClick={handleDelete}>
          Supprimer
        </Button>
      }
    >
      <p>{article.content}</p>
      <p><strong>Date :</strong> {article.created_at?.toDate().toLocaleString()}</p>
    </Card>
  );
};

export default ArticleCard;
