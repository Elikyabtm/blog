import React from "react";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddButton = ({ title, onClick }) => {
  return (
    <Tooltip title="Cliquez pour rédiger un article" placement="top">
      <Button
        type="primary"
        size="large"
        shape="round"
        icon={<PlusOutlined />} 
        onClick={onClick} 
      >
        {title}
      </Button>
    </Tooltip>
  );
};

export default AddButton;
