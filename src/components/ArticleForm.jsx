import React from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

const ArticleForm = ({ title, content, handleChange }) => {
  return (
    <Form layout="vertical">
      {/* Champ Titre */}
      <Form.Item
        label="Titre de l'article"
        name="title"
        rules={[{ required: true, message: "Veuillez entrer un titre" }]}
      >
        <Input 
          name="title"
          value={title} 
          onChange={handleChange} 
          placeholder="Entrez le titre de l'article" 
        />
      </Form.Item>

      {/* Champ Contenu */}
      <Form.Item
        label="Contenu de l'article"
        name="content"
        rules={[{ required: true, message: "Veuillez entrer un contenu" }]}
      >
        <TextArea 
          name="content"
          value={content} 
          onChange={handleChange} 
          placeholder="Entrez le contenu de l'article" 
          rows={4} 
        />
      </Form.Item>
    </Form>
  );
};

export default ArticleForm;
