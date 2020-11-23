import React from 'react';
import CascadingForm from './utils/Forms/CascadingForm';

const AddTask = (props) => {
    return (
        <div>
            <CascadingForm
                elements={[
                    {
                        type: 'text',
                        name: 'Task',
                    },
                ]}
            />
        </div>
    )
}

export default AddTask;