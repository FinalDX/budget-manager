import React from 'react';

import Category from './Category/Category';
import Item from '../Item/Item';

const categories = props => {
    const categories = {}
    for (let category of props.categories) {
        categories[category] = [];
    };
    
    for (let i = 0; i < props.itemsList.length; i++) {
        let item = (
        <Item
        key={i}
        index={i}
        name={props.itemsList[i].name}
        amount={props.itemsList[i].amount}
        itemType={props.itemsList[i].type}
        category={props.itemsList[i].category}
        deleted={props.deleted}
        />);
        categories[props.itemsList[i].category].push(item);
    };

    let key = 0;
    const categoryList = [];
    for (const [category, itemList] of Object.entries(categories)) {
        if (itemList.length > 0) {
            categoryList.push(
                <Category key={key} title={category} items={itemList} />
            );
            key++;
        }
    };

    return(
        <div>
            {categoryList}
        </div>
    );
}

export default categories;