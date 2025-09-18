export async function loadAsArrayBuffer(fileOrUrl: File | string): Promise<ArrayBuffer> {
  if (typeof fileOrUrl === "string") {
    const res = await fetch(fileOrUrl);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    return await res.arrayBuffer();
  }
  return await fileOrUrl.arrayBuffer();
}
