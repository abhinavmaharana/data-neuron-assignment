import React, { useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ComponentResizable = ({ name, initialSize, updateComponentSize, addOrUpdateData, existingComponent }) => {
    const [size, setSize] = useState(initialSize);
    const [data, setData] = useState('');
    const [operation, setOperation] = useState('add'); // Default operation is 'add'

    // Handler for resizing the component
    const handleResize = (e, { size }) => {
        setSize(size);
        updateComponentSize(name, size);
    };

    // Handler for input change
    const handleInputChange = (e) => {
        setData(e.target.value);
    };

    // Handler for adding or updating data
    const handleAddOrUpdateData = async () => {
        if (!data) {
            alert('Please enter data.');
            return;
        }

        try {
            await addOrUpdateData(name, data, operation); // Pass the operation
            alert(`Data ${operation === 'update' ? 'updated' : 'added'} successfully.`);
            setData(''); // Clear input field after adding/updating data
        } catch (error) {
            console.error('Error:', error);
            alert(`Failed to ${operation === 'update' ? 'update' : 'add'} data: ${error.message}`);
        }
    };

    return (
        <ResizableBox
            width={size.width}
            height={size.height}
            minConstraints={[100, 100]}
            onResize={handleResize}
            style={{ border: '1px solid black', margin: '10px', padding: '50px' }}
        >
            <div>
                <h2>{name}</h2>
                <p>Resizable Content</p>
                <input
                    type="text"
                    value={data}
                    onChange={handleInputChange}
                    placeholder="Enter data..."
                    style={{ marginBottom: '10px' }}
                />
                {/* Button to set the operation to 'add' */}
                <button onClick={() => setOperation('add')}>Add</button>
                {/* Button to set the operation to 'update' */}
                <button onClick={() => setOperation('update')}>Update</button>
                {/* Button to add or update data */}
                <button onClick={handleAddOrUpdateData}>{operation === 'update' ? 'Update' : 'Add'} Data</button>
            </div>
        </ResizableBox>
    );
};

const Layout = () => {
    const [componentSizes, setComponentSizes] = useState({});
    const [loading, setLoading] = useState(true);
    const [apiCount, setApiCount] = useState(0);

    useEffect(() => {
        fetchComponentSizes();
    }, []);

    // Function to fetch component sizes from the API
    const fetchComponentSizes = async () => {
        try {
            const response = await fetch('https://dataneuron-backend-assignment.onrender.com/api/count');
            if (response.ok) {
                const { componentCount } = await response.json();
                const sizes = {};
                for (let i = 1; i <= componentCount; i++) {
                    sizes[`component${i}`] = { width: 300, height: 300 }; // Default size
                }
                setComponentSizes(sizes);
                setApiCount(componentCount);
            } else {
                console.error('Failed to fetch component sizes:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching component sizes:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to update the size of a component
    const updateComponentSize = async (name, size) => {
        try {
            console.log(`Updating size of ${name} to`, size);
        } catch (error) {
            console.error('Error updating component size:', error);
        }
    };

    // Function to add or update data for a component
    const addOrUpdateData = async (name, data, operation) => {
        try {
            let url = operation === 'update' ? 'https://dataneuron-backend-assignment.onrender.com/api/data/update' : 'https://dataneuron-backend-assignment.onrender.com/api/data/add';
            const response = await fetch(url, {
                method: operation === 'update' ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, data })
            });
            if (!response.ok) {
                throw new Error('Failed to add/update data');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p>API Count: {apiCount}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ flex: '0 0 50%' }}>
                            <ComponentResizable
                                name="component1"
                                initialSize={componentSizes.component1 || { width: 300, height: 300 }}
                                updateComponentSize={updateComponentSize}
                                addOrUpdateData={addOrUpdateData}
                                existingComponent={Boolean(componentSizes.component1)}
                            />
                        </div>
                        <div style={{ flex: '0 0 50%' }}>
                            <ComponentResizable
                                name="component2"
                                initialSize={componentSizes.component2 || { width: 300, height: 300 }}
                                updateComponentSize={updateComponentSize}
                                addOrUpdateData={addOrUpdateData}
                                existingComponent={Boolean(componentSizes.component2)}
                            />
                        </div>
                        <div style={{ flex: '0 0 100%', marginTop: '20px' }}>
                            <ComponentResizable
                                name="component3"
                                initialSize={componentSizes.component3 || { width: 300, height: 300 }}
                                updateComponentSize={updateComponentSize}
                                addOrUpdateData={addOrUpdateData}
                                existingComponent={Boolean(componentSizes.component3)}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Layout;
