import React from "react";
import { Form, Input, Select } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const ArticleForm = ({ title, content, imageUrl, genre, handleChange }) => {
  return (
    <Form layout="vertical">

      <Form.Item label="Titre de l'article" name="title">
        <Input 
          name="title"
          value={title} 
          onChange={handleChange} 
          placeholder="Entrez le titre de l'article" 
        />
      </Form.Item>


      <Form.Item label="Contenu de l'article" name="content">
        <TextArea 
          name="content"
          value={content} 
          onChange={handleChange} 
          placeholder="Entrez le contenu de l'article" 
          rows={4} 
        />
      </Form.Item>


      <Form.Item label="Image (URL)" name="imageUrl">
        <Input
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
          placeholder="https://exemple.com/image.jpg"
        />
      </Form.Item>


      <Form.Item label="Genre de la série" name="genre">
        <Select
          name="genre"
          value={genre}
          onChange={(value) =>
            handleChange({ target: { name: "genre", value } })
          }
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
  );
};

export default ArticleForm;
