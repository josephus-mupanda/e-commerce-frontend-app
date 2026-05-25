import { apiSlice } from "./apiSlice";

type UploadResponse = {
  url: string;
};

export const mediaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<UploadResponse, File>({
      async queryFn(file) {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
        const folder = import.meta.env.VITE_CLOUDINARY_FOLDER;

        if (!cloudName || !uploadPreset) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error:
                "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.",
            },
          };
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        if (folder) {
          formData.append("folder", folder);
        }

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          return {
            error: {
              status: response.status,
              data: await response.text(),
            },
          };
        }

        const data = await response.json();
        return { data: { url: data.secure_url } };
      },
    }),
  }),
});

export const { useUploadImageMutation } = mediaApi;
