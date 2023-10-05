import { Select } from "antd";
import React from "react";

const Selected: React.FC<{
  width?: any;
  options: any;
  onChange?: any;
  loading: boolean;
  onSearch: any;
}> = ({ width, options, onChange, onSearch, loading }) => {
  return (
    <>
      <Select
        showSearch
        placeholder="Grouppani tanlang"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        style={{ width: width }}
        loading={loading}
        options={options}
      />
    </>
  );
};

export default Selected;
