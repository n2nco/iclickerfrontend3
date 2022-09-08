import React, {useRef, useState} from 'react';

const Button = ({name, index}) => {
    const itemRef = useRef(null);

    const [btnColor, setBtnColor] = useState('red');

    const days = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    return (
        <div
        ref={itemRef}
             >
        <button
        value={index}
         key={ index }
  
        onClick={ setBtnColor( btnColor === 'red' ? 'blue' : 'red' ) }
        style={{ backgroundColor: btnColor}}
      >
        {days[index]}
      </button>
        </div>
    );
};

export default Button;