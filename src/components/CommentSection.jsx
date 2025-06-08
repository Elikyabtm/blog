import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Input, Button, List, Card } from "antd";
import { db, storage } from "../Fire";
const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editAuthor, setEditAuthor] = useState("");
  const [editContent, setEditContent] = useState("");


  const fetchComments = async () => {
    const commentsRef = collection(db, "articles", articleId, "comments");
    const snapshot = await getDocs(commentsRef);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);


  const handleSubmit = async () => {
    if (!author || !content) return;

    await addDoc(collection(db, "articles", articleId, "comments"), {
      author,
      content,
      created_at: serverTimestamp(),
    });

    setAuthor("");
    setContent("");
    fetchComments();
  };


  const deleteComment = async (id) => {
    try {
      await deleteDoc(doc(db, "articles", articleId, "comments", id));
      fetchComments();
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };


  const startEditComment = (comment) => {
    setEditingId(comment.id);
    setEditAuthor(comment.author);
    setEditContent(comment.content);
  };

  const submitEditComment = async () => {
    const commentRef = doc(db, "articles", articleId, "comments", editingId);
    await updateDoc(commentRef, {
      author: editAuthor,
      content: editContent,
    });

    setEditingId(null);
    setEditAuthor("");
    setEditContent("");
    fetchComments();
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h4>Commentaires</h4>

      <Input
        placeholder="Votre nom"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <Input.TextArea
        placeholder="Votre commentaire"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        style={{ marginBottom: 8 }}
      />
      <Button type="primary" onClick={handleSubmit}>
        Ajouter
      </Button>

      <List
        style={{ marginTop: 20 }}
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item>
            <Card
              style={{ width: "100%" }}
              title={
                editingId === comment.id ? (
                  <>
                    <Input
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(e.target.value)}
                      placeholder="Auteur"
                      style={{ marginBottom: 4 }}
                    />
                  </>
                ) : (
                  comment.author
                )
              }
              extra={
                editingId === comment.id ? (
                  <Button size="small" type="primary" onClick={submitEditComment}>
                    Enregistrer
                  </Button>
                ) : (
                  <>
                    <Button
                      size="small"
                      onClick={() => startEditComment(comment)}
                      style={{ marginRight: 8 }}
                    >
                      Modifier
                    </Button>
                    <Button
                      size="small"
                      danger
                      onClick={() => deleteComment(comment.id)}
                    >
                      Supprimer
                    </Button>
                  </>
                )
              }
            >
              {editingId === comment.id ? (
                <Input.TextArea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={2}
                />
              ) : (
                <>
                  <p>{comment.content}</p>
                  <small>{comment.created_at?.toDate().toLocaleString()}</small>
                </>
              )}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommentSection;
