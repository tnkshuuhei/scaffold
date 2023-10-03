import { Web3Storage } from "web3.storage";
import { File } from "web3.storage";
import { v4 } from "uuid";

const uuid = v4();
const token: string = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN as string;
function getAccessToken() {
  return token.toString();
}

export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export function makeFileObjects(obj: JSON, address: string) {
  // You can create File objects from a Buffer of binary data
  // see: https://nodejs.org/api/buffer.html
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const buffer = Buffer.from(JSON.stringify(obj));

  // just create a folder for each address
  const files = [
    new File([buffer], "plain-utf8.txt"),
    new File([buffer], `${address}/${uuid}.json`),
  ];
  return files;
}

export async function storeFiles(files: File[]) {
  const client: Web3Storage = makeStorageClient();
  try {
    const cid = await client.put(files);
    console.log("✅ stored files with cid:", cid);
    return cid;
  } catch (e) {
    console.log("❌ failed to store files:", e);
  }
}
