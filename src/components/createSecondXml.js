function createSecondXml(fileData) {
    const parser = new DOMParser();
    const xml = parser.parseFromString("<AssetList></AssetList>", "application/xml");
    const AssetListNode = xml.getElementsByTagName("AssetList")[0];
    
    for (let i = 0; i < fileData.length; i++) {
      const file = fileData[i];
      const AssetNode = xml.createElement("Asset");
      const ChunkListNode = xml.createElement("ChunkList");
      const uuidNode = xml.createElement("Id");
      uuidNode.textContent = file.uuid;
      const annotationTextNode = xml.createElement("AnnotationText");
      annotationTextNode.textContent = file.name;
      const ChunkNode = xml.createElement("Chunk");
      
      const pathNode = xml.createElement("Path");
      pathNode.textContent = file.path;    
      AssetNode.appendChild(uuidNode);
      AssetNode.appendChild(annotationTextNode);
      ChunkNode.appendChild(pathNode);
      ChunkListNode.appendChild(ChunkNode);
      AssetNode.appendChild(ChunkListNode);
      AssetListNode.appendChild(AssetNode);
    }
    const serializer = new XMLSerializer();
    return serializer.serializeToString(xml);
  }
  export default createSecondXml;
  