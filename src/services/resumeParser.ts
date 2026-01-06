export async function extractResumeText(file: File): Promise<string> {
  const text = await file.text();
  return text;
}
