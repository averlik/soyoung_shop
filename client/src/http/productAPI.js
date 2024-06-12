import { $host, $authHost } from "./index";
import { jwtDecode } from 'jwt-decode';

//разделы
export const createSection = async(sections)=>{
    const {data}= await $authHost.post('api/sections',sections)
    return data
}

export const fetchSections = async()=>{
    const {data}= await $host.get('api/sections')
    return data
}

export const updateSection = async(id_section,section_name)=>{
    const {data}= await $authHost.put('api/sections/'+id_section,
        {section_name:section_name})
    return data
}

export const deleteSection = async(id_section)=>{
    const {data}= await $authHost.delete('api/sections/'+id_section)
    return data
}

//бренды
export const createBrand = async(brands)=>{
    const {data}= await $authHost.post('api/brands',brands)
    return data
}

export const updateBrand = async(id_brand, brandName)=>{
    const {data}= await $authHost.put('api/brands/'+id_brand ,
        {brand_name:brandName})
    return data
}

export const deleteBrand = async(id_brand)=>{
    const {data}= await $authHost.delete('api/brands/'+id_brand)
    return data
}

export const fetchBrands = async()=>{
    const {data}= await $host.get('api/brands')
    return data
}

export const fetchBrandsByProduct = async (id_section, id_category, id_subcategory) => {
    const { data } = await $host.get('api/brands/getByProduct', {
      params: { id_section, id_category, id_subcategory }
    });
    return data;
};  

export const fetchBrandsBySaleProduct = async () => {
    const { data } = await $host.get('api/brands/getBrandBySaleProd', {
    });
    return data;
};  

export const fetchBrandsByNewProduct = async () => {
    const { data } = await $host.get('api/brands/getBrandByNewProd', {
    });
    return data;
};  

//товары
export const createProduct= async(products)=>{
    const {data}= await $authHost.post('api/product',products)
    return data
}

export const fetchProduct = async (id_section, id_category, id_subcategory, id_brand, page, limit, sortType) => {
    const { data } = await $host.get('api/product', {
        params: {
            id_section,
            id_category,
            id_subcategory,
            id_brand,
            page,
            limit,
            sort: sortType
        }
    });
    return data;
};

export const fetchProductAdmin = async (id_section, id_category, id_subcategory, id_brand, page, limit, sortType) => {
    const { data } = await $authHost.get('api/product/getall', {
        params: {
            id_section,
            id_category,
            id_subcategory,
            id_brand,
            page,
            limit,
            sort: sortType
        }
    });
    return data;
};


export const fetchSaleProduct = async (id_brand, page, limit, published, sortType) => {
    const { data } = await $host.get('api/product/sale', {
        params: {
            id_brand,
            page,
            limit,
            published,
            sort: sortType
        }
    });
    return data;
};

export const fetchNewProduct = async (id_brand, page, limit, published, sortType) => {
    const { data } = await $host.get('api/product/new', {
        params: {
            id_brand,
            page,
            limit,
            published,
            sort: sortType
        }
    });
    return data;
};

export const updateProduct = async (id_product, products) => {
    const { data } = await $authHost.put(`api/product/${id_product}`, products);
    return data;
};

export const updateProductInfo = async (id_product, products) => {
    const { data } = await $authHost.put(`api/product/updateinfo/${id_product}`, products);
    return data;
};

export const deleteProduct = async (id_product) => {
    const { data } = await $authHost.delete(`api/product/delete/${id_product}`);
    return data;
};

// export const fetchProductsBySubcategory= async(id_subcategory)=>{
//     const {data}= await $host.get('/api/product',{params: {
//         id_subcategory
//     }})
//     return data
// }

export const fetchOneProduct= async(id_product)=>{
    const {data}= await $host.get('api/product/'+ id_product)
    return data
}

export const fetchProductInfo= async(id_product)=>{
    const {data}= await $host.get('api/product/info/'+ id_product)
    return data
}

export const searchProducts = async (query) => {
    const { data } = await $host.post('api/product/search', { query });
    return data;
};

//подкатегории
export const createSubcat= async(subcategories)=>{
    const {data}= await $authHost.post('api/subcategories',subcategories)
    return data
}

export const updateSubcat= async(id_subcategory,subcatName)=>{
    const {data}= await $authHost.put('api/subcategories/'+id_subcategory,
    {subcategory_name:subcatName})
    return data
}

export const deleteSubcat= async(id_subcategory)=>{
    const {data}= await $authHost.delete('api/subcategories/'+id_subcategory)
    return data
}

export const fetchSubcatAll= async()=>{
    const {data}= await $host.get('api/subcategories')
    return data
}

export const fetchSubcat= async(id_category)=>{
    const {data}= await $host.get('api/subcategories/'+id_category)
    return data
}

//категории
export const createCat= async(categories)=>{
    const {data}= await $authHost.post('api/categories',categories)
    return data
}

export const updateCat= async(id_category, catName)=>{
    const {data}= await $authHost.put('api/categories/'+id_category,
    {category_name:catName})
    return data
}

export const deleteCat = async(id_category)=>{
    const {data}= await $authHost.delete('api/categories/'+id_category)
    return data
}

export const fetchCatAll= async()=>{
    const {data}= await $host.get('api/categories')
    return data
}

export const fetchCat= async(id_section)=>{
    const {data}= await $host.get('api/categories/'+id_section)
    return data
}




