import React, { useState } from "react";
import { Card, Button, Tag } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Fire";
import CommentSection from "./CommentSection";
import EditArticleModal from "./EditArticleModal";

const ArticleCard = ({ article, onDelete, onArticleUpdated }) => {
  const [isEditVisible, setIsEditVisible] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "articles", article.id));
      onDelete(article.id);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur est survenue lors de la suppression.");
    }
  };

  return (
    <>
<Card
  className="article-card"
  title={null} 
  extra={null} 
  style={{ marginBottom: 16 }}
>
  <div className="card-header">
    <div className="article-title">{article.title}</div>
    <div className="article-actions">
      <Button onClick={() => setIsEditVisible(true)}>Modifier</Button>
      <Button danger onClick={handleDelete}>Supprimer</Button>
    </div>
  </div>


        {article.genre && (
          <Tag color="blue" style={{ marginBottom: 8 }}>
            {article.genre}
          </Tag>
        )}

        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt="illustration"
          />
        )}


        <p>{article.content}</p>
        <p>
          <strong>Date :</strong>{" "}
          {article.created_at?.toDate().toLocaleString()}
        </p>

        <CommentSection articleId={article.id} />
      </Card>

      <EditArticleModal
        visible={isEditVisible}
        onClose={() => setIsEditVisible(false)}
        article={article}
        onArticleUpdated={() => {
          setIsEditVisible(false);
          onArticleUpdated();
        }}
      />
    </>
  );
};

export default ArticleCard;
