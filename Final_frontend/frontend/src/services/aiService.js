export const sendMessageToAI = async (message) => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
    'https://ctf-zujn.onrender.com';

  const response = await fetch(`${baseUrl}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: 'guest', message }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");

  }
  return data.data.botReply;
}

 
