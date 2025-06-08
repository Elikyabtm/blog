import React, { useState } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../Fire";

const { TextArea } = Input;
const { Option } = Select;

const EditArticleModal = ({ visible, onClose, article, onArticleUpdated }) => {
  const [title, setTitle] = useState(article.title || "");
  const [content, setContent] = useState(article.content || "");
  const [imageUrl, setImageUrl] = useState(article.imageUrl || "");
  const [genre, setGenre] = useState(article.genre || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "content") setContent(value);
    else if (name === "imageUrl") setImageUrl(value);
    else if (name === "genre") setGenre(value);
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "articles", article.id), {
        title,
        content,
        imageUrl,
        genre,
      });
      onArticleUpdated();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <Modal
      title="Modifier l'article"
      open={visible}
      onCancel={onClose}
       className="article-modal"
      footer={[
        <Button key="cancel" onClick={onClose}>Annuler</Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          Enregistrer
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Titre">
          <Input name="title" value={title} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Contenu">
          <TextArea
            name="content"
            rows={4}
            value={content}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Image (URL)">
          <Input
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange}
            placeholder="https://exemple.com/image.jpg"
          />
        </Form.Item>

        <Form.Item label="Genre">
          <Select
            name="genre"
            value={genre}
            onChange={(value) => setGenre(value)}
            placeholder="Choisissez un genre"
          >
            <Option value="Drame">Drame</Option>
            <Option value="Comédie">Comédie</Option>
            <Option value="Action">Action</Option>
            <Option value="Science-fiction">Science-fiction</Option>
            <Option value="Fantasy">Fantasy</Option>
            <Option value="Horreur">Horreur</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditArticleModal;
