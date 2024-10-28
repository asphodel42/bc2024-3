const { Command } = require('commander');
const path = require('path');
const fs = require('fs');
const program = new Command();

program
  .version('1.0.0')
  .description('Working with JSON data of National Bank of Ukraine')
  .option('-i, --input <path>', 'path to read file (Required parameter)')
  .option('-o, --output <path>', 'path to write file with data result')
  .option('-d, --display', 'output result to terminal')
  .parse(process.argv);

const options = program.opts();

// Check if input file is specified
if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

const inputPath = path.resolve(options.input);

// Check if input file exists
if (!fs.existsSync(inputPath)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// Read input JSON file
let jsonData;
try {
    const data = fs.readFileSync(inputPath, 'utf8');
    jsonData = JSON.parse(data);
} catch (err) {
    console.error("Error reading input file:", err);
    process.exit(1);
}

// Find max rate
const maxRate = Math.max(...jsonData.map(rate => rate.rate));

// From the result, find the currency with the maximum rate
const resultText = `Максимальний курс: ${maxRate.toFixed(4)}\n`;

// Write result to output file
if (options.output) {
    const outputPath = path.resolve(options.output);
    try {
        fs.writeFileSync(outputPath, resultText);
        console.log(`Result has been saved to ${outputPath}`);
    } catch (err) {
        console.error("Error writing to output file:", err);
    }
}

// Output result to terminal
if (options.display) {
    console.log(resultText);
}