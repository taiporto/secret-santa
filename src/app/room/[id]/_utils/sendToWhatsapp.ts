const parseToWhatsapp = (message:string) => {
  return message
    .replaceAll("\n", "%0A")
    .replaceAll(" ", "%20")
    .replaceAll("**", "%2A")
}

export const sendToWhatsapp = (message:string) => {
  const url = `https://wa.me/?text=${parseToWhatsapp(message)}`;
  window.open(url, "_blank");
};