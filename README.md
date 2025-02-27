A set of tests designed to proof-of-concept various Huggingface/transformers node.js libraries.

Overall, I tried binary_classification (sentiment_analysis), summarization, text generation (under llm.js), and translation.

Unfortunately, because the entire transformers.js ecosystem is supported by a single developer in all of Huggingface (with no other community support whatsoever), the capabilities of what one can do with Huggingface are extremely limited. For instance, I had trouble even using the float16 data type in order to speed up inference, and just about every LLM I tried to load (Phi 3, Qwen) were only available on ONNX (and that's if they were available - Huggingface doesn't even support Llama 3/3.1/3.2/3.3, among many others).

To run, just run the command "app <task_name>.js" and use 

http://127.0.0.1:3000/classify?text=<input_text>c%20Transformers.js

I left the endpoint as "classify" for all files for simplicity, though you are welcome to change that.

Happy testing!

Tutorial source: https://huggingface.co/docs/transformers.js/en/tutorials/node, with some digging from https://huggingface.co/docs/transformers.js/api/pipelines#module_pipelines.SummarizationPipeline and minor QoL changes I independently added.
