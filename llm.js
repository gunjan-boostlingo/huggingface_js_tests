import http from 'http';
import querystring from 'querystring';
import url from 'url'

import { pipeline, env } from '@huggingface/transformers';

class MyLLMPipeline {
  static task = 'text-generation';
  static model = 'Xenova/distilgpt2';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      // NOTE: Uncomment this to change the cache directory
      // env.cacheDir = './.cache';

      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
};

// Define the HTTP server
const server = http.createServer();
const hostname = '127.0.0.1';
const port = 3000;

// Listen for requests made to the server
server.on('request', async (req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url);

  // Extract the query parameters
  const { text } = querystring.parse(parsedUrl.query);

  // Set the response headers
  res.setHeader('Content-Type', 'application/json');

  let response;
  if (parsedUrl.pathname === '/classify' && text) {
    const generator = await MyLLMPipeline.getInstance();
    const cleanedText = text.replace(/\s*Transformers\.js\s*/gi, '');
    response = await generator(cleanedText, {max_new_tokens: "100", return_full_text: False, temperature: 0.0, 'do_sample': False});
    // Add text to the response
    response = {
      prompt: cleanedText,
      completion: response
    };;
    res.statusCode = 200;
  } else {
    response = { 'error': 'Bad request' }
    res.statusCode = 400;
  }

  // Send the JSON response
  res.end(JSON.stringify(response));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

MyLLMPipeline.getInstance();
