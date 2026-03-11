export const getDealStageStyle = (stage) => {
  switch (stage) {
    case "Prospect":
      return "bg-blue-100 text-blue-700";
    case "Negotiation":
      return "bg-yellow-100 text-yellow-700";
    case "Won":
      return "bg-green-100 text-green-700";
    case "Lost":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }

};
