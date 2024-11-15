export const sendToWhatsapp = (message:string) => {
  const url = `https://wa.me/?text=${message}`;
  window.open(url, "_blank");
};