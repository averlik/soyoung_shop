import React, { useContext, useEffect } from 'react';
import { Dropdown, Form } from "react-bootstrap";
import { Context } from "../../../index.js";
import { observer } from 'mobx-react-lite';
import { fetchSections, fetchCat, fetchSubcat } from '../../../http/productAPI.js';

const SelectFilter = observer(() => {
    const { products } = useContext(Context);

    useEffect(() => {
        fetchSections()
            .then(data => products.adminSetSections(data))
            .catch(error => console.error('Ошибка загрузки разделов:', error));
    }, [products]);

    const handleSectionSelect = (section) => {
        products.adminSetSelectedSections(section);
        fetchCat(section.id_section)
            .then(data => products.adminSetCategories(data))
            .catch(error => console.error('Ошибка загрузки категорий:', error));
    };

    const handleCategorySelect = (category) => {
        products.adminSetSelectedCategories(category);
        fetchSubcat(category.id_category)
            .then(data => products.adminSetSubcategories(data))
            .catch(error => console.error('Ошибка загрузки подкатегорий:', error));
    };

    return (
        <div className='mb-3'>
            <Dropdown className='mt-3'>
                <Dropdown.Toggle>
                    {products.adminSelectedSections?.section_name || "Выберите раздел товаров"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {products.sections.map(section => (
                        <Dropdown.Item
                            onClick={() => { handleSectionSelect(section); }}
                            key={section.id_section}
                        >
                            {section.section_name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown className='mt-3'>
                <Dropdown.Toggle>
                    {products.adminSelectedCategories?.category_name || "Выберите категорию товаров"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {products.adminCategories.map(category => (
                        <Dropdown.Item
                            onClick={() => handleCategorySelect(category)}
                            key={category.id_category}
                        >
                            {category.category_name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown className='mt-3'>
                <Dropdown.Toggle>
                    {products.adminSelectedSubcategories?.subcategory_name || "Выберите подкатегорию товаров"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {products.adminSubcategories.map(subcategory => (
                        <Dropdown.Item
                            onClick={() => products.adminSetSelectedSubcategories(subcategory)}
                            key={subcategory.id_subcategory}
                        >
                            {subcategory.subcategory_name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
});

export default SelectFilter;
