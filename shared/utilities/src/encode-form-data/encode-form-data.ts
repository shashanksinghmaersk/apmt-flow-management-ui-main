export const encodeFormData = (data: Record<string, string>) => {
  const formData = new URLSearchParams();

  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData.toString();
};
