export const generatePromptFromLinkedInData = async (body: any): Promise<any> => {
  return new Promise(async (resolve) => {
    try {
      resolve({ data: {} });
    } catch (error) {
      console.log("error", error);
      resolve({ error: "Server Error" });
    }
  });
};
