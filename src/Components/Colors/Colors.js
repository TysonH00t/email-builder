import React from 'react';
import Color from './Color/Color';


const Colors = [
    {style: '#000000'},
    {style: '#505050'},
    {style: '#0078D7'},
    {style: '#ffffff'},
    

]


const ColorBlocks = () => (
    Colors.map(color => 
            <Color color={color.style}></Color>
        )
    
)


export default ColorBlocks;