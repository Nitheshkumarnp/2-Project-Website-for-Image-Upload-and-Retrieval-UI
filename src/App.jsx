import React, { useState, useEffect } from 'react';

function App() {
  const [images, setImages] = useState([]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data.message); // Log success message
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleGetImages = async () => {
    try {
      const response = await fetch('/images');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Get images error:', error);
    }
  };

  useEffect(() => {
    handleGetImages(); // Fetch images on initial load
  }, []);

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <button onClick={handleGetImages}>Get Images</button>
      {images.map((image, index) => (
        <img key={index} src={`data:image/png;base64,${image.image_data}`} alt={`Image ${index}`} />
      ))}
    </div>
  );
}

export default App;