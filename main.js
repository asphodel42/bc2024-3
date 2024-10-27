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
fs.readFile(inputPath, 'utf8', (err, data) => {
    // Error catch
    if (err) {
      console.error("Error reading input file:", err);
      process.exit(1);
    }
  
    const jsonData = JSON.parse(data);
  
    // Check if output file is specified
    if (options.output) {
      const outputPath = path.resolve(options.output);
      // Write output JSON file
      fs.writeFile(outputPath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error("Error writing to output file:", err);
        } else {
          console.log(`Result has been saved to ${outputPath}`);
        }
      });
    }
    // Output to terminal
    if (options.display) {
      console.log("Result:", jsonData);
    }
});