import React from 'react';
import Color from './Color/Color';

const Colors = [
    '#eeeeee',
    '#505050',
    '#000000',
    '#0078D7'

]

const ColorBlocks = () => {
    return (
        Colors.map(color => 
            <Color style={{background: color}}>&nbsp;</Color>
        )
    )
}

export default ColorBlocks