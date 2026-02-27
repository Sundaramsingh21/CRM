export const getDealStageStyle = (stage) => {
  switch (stage) {
    case "prospecting":
      return "bg-blue-100 text-blue-700";
    case "negotiation":
      return "bg-yellow-100 text-yellow-700";
    case "closed-won":
      return "bg-green-100 text-green-700";
    case "closed-lost":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};