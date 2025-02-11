import confetti from "canvas-confetti";

const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2ECC71", "#1ABC9C", "#3498DB"],
    });
  };

export default handleConfetti;