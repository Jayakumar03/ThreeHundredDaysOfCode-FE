import React from "react";
import { Select } from 'antd';
import { languageOptions } from "../constants/languageOptions";
import styled from "styled-components";

const option = (props) => (
  <div {...props.innerProps}>
    {props.data.shouldBeDisplayed? props.label : null}
  </div>
);
const StyledSelect = styled((props) => <Select {...props} />)`
  margin-left: 20px!important;
  border-radius: 0.5rem!important;
  width: 200px!important;
  height: 50px!important;

  .ant-select-selector {
    height: 40px!important;
  }
  .ant-select-arrow {
    top: 40%!important;
    color: black!important;
  }
  .ant-select-selection-search {
    padding: 0.78em 0.78em 0.78em 0.78em!important;
  }
`
var dict = {};
languageOptions.forEach((opts, index) => dict[opts.value] = opts);

const LanguagesDropdown = ({ onSelectChange }) => {  
  const handleSelect = (value) => {
    onSelectChange(dict[value])
  }
  return (
    <StyledSelect
      components={{Option: option}}
      placeholder={`Filter By Category`}
      options={languageOptions}      
      defaultValue={languageOptions[0]}      
      onChange={handleSelect}
    />
  );
};

export default LanguagesDropdown;