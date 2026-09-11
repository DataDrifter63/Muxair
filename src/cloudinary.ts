const cloudName = import.meta.env["VITE_CLOUDINARY_CLOUD_NAME"];
const uploadPreset = import.meta.env["VITE_CLOUDINARY_UPLOAD_PRESET"];

/**
 * Uploads a file directly from the browser to Cloudinary using an unsigned
 * upload preset, and returns the resulting hosted image URL. Set
 * VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env
 * (see Cloudinary dashboard → Settings → Upload → Upload presets).
 */
export async function uploadImage(file: File): Promise<string> {
  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary is not configured — add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env",
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Cloudinary upload failed: ${body}`);
  }

  const data = await res.json();
  return data.secure_url as string;
}
