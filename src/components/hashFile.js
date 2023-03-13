import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const hashFile = async (file) => {
  const buffer = await file.arrayBuffer();
  const hashVal = CryptoJS.SHA1(CryptoJS.lib.WordArray.create(buffer));
  const hashBase64 = hashVal.toString(CryptoJS.enc.Base64);
  const uuid = uuidv4();
  const path = file.webkitRelativePath;
  const type = file.type;
  const size = file.size;

  return { uuid, name: file.name, hash: hashBase64, size, type, path };
};

export { hashFile };
