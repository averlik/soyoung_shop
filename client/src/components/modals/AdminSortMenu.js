import React from 'react';
import Form from 'react-bootstrap/Form';

function AdminSortMenu({ sortType, setSortType }) {
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  return (
    <Form.Select 
      size="sm" 
      style={{ width: '220px', marginBottom: '20px' }} 
      value={sortType} 
      onChange={handleSortChange}
    >
      <option value="">Сортировка по статусу</option>
      <option value="в обработке">в обработке</option>
      <option value="заказ принят">заказ принят</option>
      <option value="готов к выдаче">готов к выдаче</option>
      <option value="выдан">выдан</option>
      <option value="отменен">отменен</option>
    </Form.Select>
  );
}

export default AdminSortMenu;
