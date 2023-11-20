// To importing necessary dependencies from React,
import React, { useState } from 'react';

// Custom hook for managing input values
const useInput = (initialValue: string) => {
    // To store the input value,
    const [value, setValue] = useState(initialValue);

    // Event handler to update the input value
    const onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.currentTarget.value);
    };
    return { value, onChange };
};

export default useInput;
