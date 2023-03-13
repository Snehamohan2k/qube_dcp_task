import React from "react";
import HandleUpload from "./components/handleUpload";


function App() {
  const { handleUpload, hashes } = HandleUpload();

  return (
    <div>
       <header style={{ backgroundColor: 'teal', color: 'white', height: '150px',  width: '100%' }}>
       {/* <h1 style={{ fontSize: '2rem',fontFamily:'', marginLeft: '1rem' }}> */}
        
       <img src="https://d2tawjvx8xg9xv.cloudfront.net/qw/qwlogo-sfer.svg" alt="" width="350" height="150" ></img>
      
      {/* </h1> */}
       </header>
       <h2 style={{color:"White", fontFamily:"serif"}}>Upload a Folder to generate PKL and ASSETMAP</h2>
      <input
        type="file"
        webkitdirectory="true"
        directory
        multiple
        onChange={handleUpload}
      />
      {hashes.map((file, index) => (
        <div style={{color:"white"}} key={index}>
          <br></br>
          <div>UUID: {file.uuid}</div>
          <div>Path: {file.path}</div>
          <div>Name: {file.name}</div>
          <div>Hash: {file.hash}</div>
          <div>Type: {file.type}</div>
          <div>Size: {file.size} bytes</div>
         
        </div>
      ))}
    </div>
  );
}

export default App;
