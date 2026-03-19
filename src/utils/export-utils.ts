import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (elementId: string, filename: string = "qrcode.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2,
  });
  const imgData = canvas.toDataURL("image/png");
  
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(filename);
};

export const copyToClipboard = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2,
  });

  canvas.toBlob(async (blob) => {
    if (blob) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        return true;
      } catch (err) {
        console.error("Clipboard copy failed:", err);
        return false;
      }
    }
  }, "image/png");
};
