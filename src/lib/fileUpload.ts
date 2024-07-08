import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function uploadFile(dataUrl: string): Promise<string> {
  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error("Invalid data URL");

  const [, fileType, base64Data] = matches;
  const extension = fileType.split("/")[1];

  const fileName = `${uuidv4()}.${extension}`;

  const publicDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(publicDir, fileName);

  await fs.mkdir(publicDir, { recursive: true });

  await fs.writeFile(filePath, base64Data, "base64");

  return `/uploads/${fileName}`;
}
