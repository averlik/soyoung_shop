import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { searchProducts } from "../http/productAPI";
import ProductListSearch from "../components/ProductListSearch";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = observer(() => {
    const { user } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const query = useQuery();
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

    const handleSearch = async () => {
        try {
            const results = await searchProducts(debouncedSearchQuery);
            setSearchResults(results);
            setError('');
        } catch (error) {
            setError('Ошибка при поиске товаров');
        }
    };

    useEffect(() => {
        const queryParam = query.get('query');
        if (queryParam) {
            setSearchQuery(queryParam);
            setDebouncedSearchQuery(queryParam);
        }
    }, [query]);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500); // Задержка в миллисекундах перед выполнением поиска

        return () => clearTimeout(delaySearch);
    }, [searchQuery]);

    useEffect(() => {
        if (debouncedSearchQuery) {
            handleSearch();
        }
    }, [debouncedSearchQuery]);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={12}>
                    {error && <div className="text-danger">{error}</div>}
                    <ProductListSearch searchResults={searchResults} isAdmin={user.isAdmin} />
                </Col>
            </Row>
        </Container>
    );
});

export default SearchResults;
