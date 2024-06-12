import { observer } from "mobx-react-lite";
import React,{useContext} from "react";
import {Context} from "../index";
import Pagination from 'react-bootstrap/Pagination';


const Pages=observer(()=>{
    const {products} = useContext(Context)
    const pageCount = Math.ceil(products.totalCount / products.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return(
        <Pagination className="mt-3 d-flex justify-content-center" >
             {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={products.page === page}
                    onClick={() => products.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    )
});

export default Pages;