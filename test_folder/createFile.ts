const encoder = new TextEncoder();

const greetText = encoder.encode('Hello World\nHere i am!');

await Deno.writeFile('greet.txt', greetText);