import React from 'react';

const MenuLabel = ({ labelText, labelColor }) => {
    if (!labelText) return null;

    return (
        <span style={{
            fontSize: '0.65rem',
            padding: '2px 6px',
            borderRadius: '3px',
            backgroundColor: labelColor,
            color: 'white',
            fontWeight: 'bold',
            marginLeft: '5px',
            textTransform: 'uppercase'
        }}>
      {labelText}
    </span>
    );
};

export default MenuLabel;
