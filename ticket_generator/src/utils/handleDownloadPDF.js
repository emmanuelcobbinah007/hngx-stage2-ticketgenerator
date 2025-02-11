import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const handleDownloadPDF = async (ticketData) => {
    const contentToCapture = document.querySelector(".pdf-content");
    if (!contentToCapture) return;

    const canvas = await html2canvas(contentToCapture, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 190;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);

    const fileName = ticketData && ticketData.fullName 
        ? `${ticketData.fullName.replace(" ", "_")}_ticket.pdf` 
        : "ticket.pdf";

    pdf.save(fileName);
};

export default handleDownloadPDF;