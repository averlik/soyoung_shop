import React, { useContext, useEffect } from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';
import { observer } from "mobx-react-lite";
import { fetchSubcat, fetchCat, fetchBrandsByProduct } from "../http/productAPI";
import BrandAccardion from "./BrandComponents/BrandAccardion";

const SubcatBar = observer(() => {
    const { products } = useContext(Context);


    const loadBrands = () => {
        fetchBrandsByProduct(
            products.selectedSections?.id_section,
            products.selectedCategories?.id_category,
            products.selectedSubcategories?.id_subcategory
        ).then(data => products.setBrand(data));
    };

    const handleSectionClick = (section) => {
        products.setSelectedSections(section); // Установка выбранного раздела
        products.setSelectedCategories(0); // Сброс выбранной категории
        products.setSelectedSubcategories(0); // Сброс выбранной подкатегории
        products.setSelectedBrand(null); // Сброс выбранного бренда
        products.setCategories([]); // Очистка категорий
        products.setSubcategories([]); // Очистка подкатегорий

        fetchCat(section.id_section).then(data => {
            products.setCategories(data);
        });

        localStorage.setItem("catalogFilters", JSON.stringify({
            selectedSections: section,
            selectedCategories: 0,
            selectedSubcategories: 0
        }));

        loadBrands();
    };

    const handleCategoryClick = (category) => {
        products.setSelectedCategories(category); // Установка выбранной категории
        products.setSelectedSubcategories(0); // Сброс выбранной подкатегории
        products.setSelectedBrand(null); // Сброс выбранного бренда

        fetchSubcat(category.id_category).then(data => {
            products.setSubcategories(data);
        });

        localStorage.setItem("catalogFilters", JSON.stringify({
            selectedSections: products.selectedSections,
            selectedCategories: category,
            selectedSubcategories: 0
        }));

        loadBrands();
    };

    const handleSubcategoryClick = (subcategory) => {
        products.setSelectedSubcategories(subcategory); // Установка выбранной подкатегории
        products.setSelectedBrand(null); // Сброс выбранного бренда

        localStorage.setItem("catalogFilters", JSON.stringify({
            selectedSections: products.selectedSections,
            selectedCategories: products.selectedCategories,
            selectedSubcategories: subcategory
        }));

        loadBrands();
    };

    const handleAllSubcategoriesClick = () => {
        products.setSelectedSubcategories(0); // Сброс выбранной подкатегории
        products.setSelectedBrand(null); // Сброс выбранного бренда

        localStorage.setItem("catalogFilters", JSON.stringify({
            selectedSections: products.selectedSections,
            selectedCategories: products.selectedCategories,
            selectedSubcategories: 0
        }));

        loadBrands();
    };

    const handleBackToCategoriesClick = () => {
        products.setSelectedCategories(0); // Сброс выбранной категории
        products.setSelectedSubcategories(0); // Сброс выбранной подкатегории
        products.setSelectedBrand(null); // Сброс выбранного бренда
        products.setSubcategories([]); // Очистка подкатегорий

        localStorage.setItem("catalogFilters", JSON.stringify({
            selectedSections: products.selectedSections,
            selectedCategories: 0,
            selectedSubcategories: 0
        }));

        loadBrands();
    };

    const handleBackToSectionsClick = () => {
        products.setSelectedSections(0); // Сброс выбранного раздела
        products.setSelectedCategories(0); // Сброс выбранной категории
        products.setSelectedSubcategories(0); // Сброс выбранной подкатегории
        products.setSelectedBrand(null); // Сброс выбранного бренда
        products.setCategories([]); // Очистка категорий
        products.setSubcategories([]); // Очистка подкатегорий

        localStorage.setItem("catalogFilters", JSON.stringify({
            selectedSections: 0,
            selectedCategories: 0,
            selectedSubcategories: 0
        }));

        loadBrands();
    };

    useEffect(() => {
        loadBrands();
    }, [products.selectedSections, products.selectedCategories, products.selectedSubcategories]);

    return (
        <div>
            <div>
                <ListGroup className="mt-4">
                    {products.selectedSections.id_section ? (
                        products.selectedCategories.id_category ? (
                            <>
                                {products.subcategories.length > 0 ? (
                                    <>
                                        <ListGroup.Item
                                            style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                            onClick={handleBackToCategoriesClick}
                                            variant="outline-primary"
                                        >
                                            Назад к списку категорий
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            style={{ cursor: 'pointer' }}
                                            active={!products.selectedSubcategories}
                                            onClick={handleAllSubcategoriesClick}
                                            variant="outline-success"
                                        >
                                            Все товары этой категории
                                        </ListGroup.Item>
                                        {products.subcategories.map(subcategory =>
                                            <ListGroup.Item
                                                style={{ cursor: 'pointer' }}
                                                active={subcategory.id_subcategory === products.selectedSubcategories?.id_subcategory}
                                                onClick={() => handleSubcategoryClick(subcategory)}
                                                key={subcategory.id_subcategory}
                                                variant="outline-success"
                                            >
                                                {subcategory.subcategory_name}
                                            </ListGroup.Item>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <ListGroup.Item
                                            style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                            onClick={handleBackToSectionsClick}
                                            variant="outline-primary"
                                        >
                                            Назад к разделам
                                        </ListGroup.Item>
                                        {products.categories.filter(cat => cat.section_id === products.selectedCategories.section_id).map(category =>
                                            <ListGroup.Item
                                                style={{ cursor: 'pointer' }}
                                                active={category.id_category === products.selectedCategories.id_category}
                                                onClick={() => handleCategoryClick(category)}
                                                key={category.id_category}
                                                variant="outline-success"
                                            >
                                                {category.category_name}
                                            </ListGroup.Item>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <ListGroup.Item
                                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={handleBackToSectionsClick}
                                    variant="outline-primary"
                                >
                                    Назад к разделам
                                </ListGroup.Item>
                                {Array.isArray(products.categories) && products.categories.map(category =>
                                    <ListGroup.Item
                                        style={{ cursor: 'pointer' }}
                                        active={category.id_category === products.selectedCategories?.id_category}
                                        onClick={() => handleCategoryClick(category)}
                                        key={category.id_category}
                                        variant="outline-success"
                                    >
                                        {category.category_name}
                                    </ListGroup.Item>
                                )}
                            </>
                        )
                    ) : (
                        Array.isArray(products.sections) && products.sections.map(section =>
                            <ListGroup.Item
                                style={{ cursor: 'pointer' }}
                                active={section.id_section === products.selectedSections?.id_section}
                                onClick={() => handleSectionClick(section)}
                                key={section.id_section}
                                variant="outline-success"
                            >
                                {section.section_name}
                            </ListGroup.Item>
                        )
                    )}
                </ListGroup>
            </div>
            <BrandAccardion/>
        </div>
    );
});

export default SubcatBar;
