function createXml(fileData) {
    const parser = new DOMParser();
    const xml = parser.parseFromString("<PackingList></PackingList>", "application/xml");
    const filesNode = xml.getElementsByTagName("PackingList")[0];
    const assetListNode = xml.createElement("AssetList");
    for (let i = 0; i < fileData.length; i++) {
      const file = fileData[i];
      const assetNode = xml.createElement("Asset");
      const nameNode = xml.createElement("AnnotationText");
      nameNode.textContent = file.name;
      const uuidNode = xml.createElement("Id");
      uuidNode.textContent = file.uuid;
      const hashNode = xml.createElement("Hash");
      hashNode.textContent = file.hash;
      const typeNode = xml.createElement("Type");
      typeNode.textContent = file.type;
      const sizeNode = xml.createElement("Size");
      sizeNode.textContent = file.size;
      assetNode.appendChild(uuidNode);
      assetNode.appendChild(nameNode);
      assetNode.appendChild(hashNode);
      assetNode.appendChild(typeNode);
      assetNode.appendChild(sizeNode);
      assetListNode.appendChild(assetNode);
    }
    filesNode.appendChild(assetListNode);
    const serializer = new XMLSerializer();
    return serializer.serializeToString(xml);
  }
  
  export default createXml;
  