import React from 'react';
import Button from '../Button/Button';


const Colors = [
    {style: '#000000'},
    {style: '#505050'},
    {style: '#0078D7'},
    {style: '#ffffff'},
]


const ColorBlocks = (props) => (
    Colors.map(color => 
            <Button buttonType={'BackColor'} buttonFunction={(variable) => props.buttonFunction(variable)} variable={color.style} color={color.style}></Button>
        )
    
)


export default ColorBlocks;