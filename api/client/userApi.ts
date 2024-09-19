// const updateUserApi = async (user: { name: string; email: string }) => {
//   const response = await fetch("/api/me/update", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name: user.name, email: user.email }),
//   });

//   return response.json();
// };

const updateUserApi = async (user: { name: string; email: string }) => {
  try {
    const response = await fetch("/api/me/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: user.name, email: user.email }),
    });

    if (!response.ok) {
      throw new Error("API call failed");
    }

    return response.json();
  } catch (error) {
    console.error("Update user failed:", error);
    throw error;
  }
};

export { updateUserApi };
