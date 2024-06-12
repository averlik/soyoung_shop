import React from 'react';
import Form from 'react-bootstrap/Form';

function SortMenu({ sortType, setSortType }) {
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  return (
    <Form.Select 
      size="sm"
      className="mt-4" 
      style={{ width: '200px' }} 
      value={sortType} 
      onChange={handleSortChange}
    >
      <option value="">сортировка по</option>
      <option value="asc">по возрастанию</option>
      <option value="desc">по убыванию</option>
    </Form.Select>
  );
}

export default SortMenu;
