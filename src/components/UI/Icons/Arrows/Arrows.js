import React from 'react';

import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';


const arrow = props => props.show ? <IoIosArrowUp /> : <IoIosArrowDown />;

export default arrow;