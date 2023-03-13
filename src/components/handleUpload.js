import { useState } from "react";
import { hashFile } from "./hashFile";
import createXml from "./createXml";
import createSecondXml from "./createSecondXml";

const HandleUpload = () => {
  const [hashes, setHashes] = useState([]);
  const handleUpload = async (event) => {
    const files = event.target.files;
    const fileData = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const { uuid, name, hash, size, type, path } = await hashFile(file);
      fileData.push({ uuid, name, hash, size, type, path });
    }

    setHashes(fileData);

    const xml = createXml(fileData);
    const blob = new Blob([xml], { type: "application/xml" });

    const directoryPath = files[0].webkitRelativePath
      .split("/")
      .slice(0, -1)
      .join("/");

    const fileName = "PackagingList.xml";
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.setAttribute("webkitdirectory", directoryPath);
    downloadLink.click();

    const secondXml = createSecondXml(fileData);
    const secondBlob = new Blob([secondXml], { type: "application/xml" });
    const secondFileName = "assetmap.xml";
    const secondDownloadLink = document.createElement("a");
    secondDownloadLink.href = URL.createObjectURL(secondBlob);
    secondDownloadLink.download = secondFileName;
    secondDownloadLink.setAttribute("webkitdirectory", directoryPath);
    secondDownloadLink.click();
  };

  return { handleUpload, hashes };
};

export default HandleUpload;
