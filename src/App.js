
import React, { useState } from "react";
import createXml from "./component/createXml";
import createSecondXml from './component/createSecondXml'
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
function App() {
  const [hashes, setHashes] = useState([]);
  const handleUpload = async () => {
    const files = await window.showDirectoryPicker();
    const directoryuuid=uuidv4();
    const fileHandle = await files.getFileHandle("PackagingList.xml", { create: true });
    const fileHandleMap = await files.getFileHandle("ASSETmap.xml", { create: true });
       const writableStreamMap = await fileHandleMap.createWritable();
  const writableStream = await fileHandle.createWritable();
const fileData = [];

await getFilePaths(files);

async function getFilePaths(files, path ='') {
  const files2 = await files.values();
  for await (const entry of files2) {
    if (entry.kind === 'file') {
      const file = await entry.getFile();
      const fileName = file.name;
      const filePath = path ? `${path}/${fileName}` : fileName;
     // console.log(fileName.split('.').pop());

      const { uuid, name, hash, size,type} = await hashFile(file);
   //   const filetype=file.type;
      fileData.push({ uuid, name, hash, size, type, path: filePath });

    } else if (entry.kind === 'directory') {
      const directoryName = entry.name;
      const directoryPath = path ? `${path}/${directoryName}` : directoryName;
      await getFilePaths(entry, directoryPath);
    }
  }
}
  setHashes(fileData);
 
   const xmlData = createXml(fileData, files.name,directoryuuid);
    await writableStream.write(xmlData);
    await writableStream.close();
 const AssetData = createSecondXml(fileData,files.name,directoryuuid);
    
    await writableStreamMap.write(AssetData);
    
    await writableStreamMap.close();

  };
  

  const hashFile = async (file) => {
  //const type=file.type;
  console.log("File Name"+file.name);
  const type=file.type;
  console.log("File Type"+type);
  
    var sha1 = CryptoJS.algo.SHA1.create();
    var chunkSize = 1024 * 1024; // 1 MB
    var hash;
   // console.log(file.type);
    const readNextChunk = (start, end) => {
      const fileSlice = file.slice(start, end);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const chunk = event.target.result;
          sha1.update(CryptoJS.lib.WordArray.create(chunk));
          resolve();
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(fileSlice);
      });
    };
  
    let offset = 0;
    while (offset < file.size) {
      const start = offset;
      const end = offset + chunkSize;
      await readNextChunk(start, end);
      offset = end;
    }
  
    hash = sha1.finalize().toString(CryptoJS.enc.Base64);
   // console.log(hash);
    const uuid = uuidv4();
    //const type = file.type;
    const size = file.size;
    //console.log(type);
    return { uuid,name: file.name, hash ,size,type};
  };
  
  return (
    <div>
         <header style={{ backgroundColor: 'teal', color: 'white', height: '150px',  width: '100%' }}>
        
       <img src="https://d2tawjvx8xg9xv.cloudfront.net/qw/qwlogo-sfer.svg" alt="" width="350" height="150" ></img>
      
       </header>
       <h2 style={{color:"White", fontFamily:"serif"}}>Upload a Folder to generate PKL and ASSETMAP</h2>
      <button onClick={handleUpload}> Choose a file</button>
      {hashes.map((file, index) => (
        <div style={{color:"white"}} key={index}>
          <div>UUID: {file.uuid}</div>
          <div>Path: {file.path}</div>
          <div>Name: {file.name}</div>
          <div>Hash: {file.hash}</div>
          <div>Type: {file.type}</div>
         <div>Size: {file.size} bytes</div>
           <br></br>
       </div>
      ))}
    </div>
  );
      }
export default App;  
