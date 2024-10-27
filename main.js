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

// Перевірка наявності вхідного файлу
if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

const inputPath = path.resolve(options.input);

// Перевіряємо, чи існує вхідний файл
if (!fs.existsSync(inputPath)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// Читаємо дані з JSON файлу
fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading input file:", err);
      process.exit(1);
    }
  
    const jsonData = JSON.parse(data);
  
    // Логіка для виведення результату залежно від параметрів
    if (options.output) {
      const outputPath = path.resolve(options.output);
      fs.writeFile(outputPath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error("Error writing to output file:", err);
        } else {
          console.log(`Result has been saved to ${outputPath}`);
        }
      });
    }
  
    if (options.display) {
      console.log("Result:", jsonData);
    }
});