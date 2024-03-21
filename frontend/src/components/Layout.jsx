import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const Layout = () => {
    const [componentSizes, setComponentSizes] = useState({
      component1: { width: 200, height: 200 },
      component2: { width: 200, height: 200 },
      component3: { width: 200, height: 200 }
    });
  
    const handleResize = (e, { size }, component) => {
      setComponentSizes(prevSizes => ({
        ...prevSizes,
        [component]: size
      }));
    };
  
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <ResizableBox
            width={componentSizes.component1.width}
            height={componentSizes.component1.height}
            minConstraints={[100, 100]}
            onResize={(e, { size }) => handleResize(e, { size }, 'component1')}
            style={{ border: '1px solid black', margin: '10px' }}
          >
            Component 1
          </ResizableBox>
          <ResizableBox
            width={componentSizes.component2.width}
            height={componentSizes.component2.height}
            minConstraints={[100, 100]}
            onResize={(e, { size }) => handleResize(e, { size }, 'component2')}
            style={{ border: '1px solid black', margin: '10px' }}
          >
            Component 2
          </ResizableBox>
        </div>
        <div>
          <ResizableBox
            width={componentSizes.component3.width}
            height={componentSizes.component3.height}
            minConstraints={[100, 100]}
            onResize={(e, { size }) => handleResize(e, { size }, 'component3')}
            style={{ border: '1px solid black', margin: '10px' }}
          >
            Component 3
          </ResizableBox>
        </div>
      </div>
    );
  };

export default Layout;
