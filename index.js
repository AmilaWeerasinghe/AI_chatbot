// The entry point of the application
import OpenAI, { OpenAIError } from "openai";
import readline from "readline";

//create the configurations
// TODO: Replace with env variables
const openai = new OpenAI({
    organization: "",
    apiKey: "",//replace
  });

  //create the openai api (legacy version)
  //const openai = new OpenAIApi(configuration);

  //test the openai api (v4.0)
//   const chatCompletion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{"role": "user", "content": "Hello!"}],
//   });
  //console.log(chatCompletion.choices[0].message);

  // read the user input and respond to terminal
  const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  //prompt the user for input
  userInterface.prompt();

  // upon enter key press, send the input to the openai api
  // and log the response to the terminal
  userInterface.on("line", async (input) => {
    await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": input}],
      })
      .then((res) => {
        console.log(res.data.choices[0].message.content);
        userInterface.prompt();
      })
      .catch((e) => {
        console.log(e);
      });
  });