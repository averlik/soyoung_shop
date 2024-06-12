import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';


const SectionBar = observer(() =>{
    const {products}=useContext(Context)
    
    return(
    <ListGroup>
        {Array.isArray(products.sections) && products.sections.map(section =>
    <ListGroup.Item
        key={section.id_section}
        style={{ cursor: 'pointer' }} //не работает при наведении надо сделать стили
        active={section.id_section === products.selectedSections.id_section}
        onClick={() => products.setSelectedSections(section)}
    >
        {section.section_name}
    </ListGroup.Item>
        )}
    </ListGroup>
    );
    
});

export default SectionBar;