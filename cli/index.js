#! /usr/bin/env node
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const commander = require("commander");
const program = new commander.Command();

const ppscall=require('./commands/PassesPerStation.js');
const pacall=require('./commands/PassesAnalysis.js');
const pccall=require('./commands/PassesCost.js');
const cbcall=require('./commands/ChargesBy.js');

program 
    .version('1.0.0')
    .description('Command Line Interface Software Engineering NTUA 2022');

//CLI options for basic operations:
program
    .command('passesperstation')
    .description('Give ALL the below parameters to see the corresponding \'Passes Analysis\'')
    .showHelpAfterError('add --help for additional information')
    .helpOption('-h, --help', 'Display help for command')
    .requiredOption('--station <stationID>',    'Give a stationID                 ->     {xxx}')
    .requiredOption('--datefrom <datefrom>',    'Give a starting date             ->     YYYY-MM-DD%20HH-MM-SS')
    .requiredOption('--dateto <dateto>',        'Give ending date                 ->     YYYY-MM-DD%20HH-MM-SS')
    .requiredOption('--format <format>',        'Give the required format         ->     {json, csv}')
    .action((options)=> {
        ppscall(options.station, options.datefrom, options.dateto, options.format);
    });

program 
    .command('passesanalysis')
    .description('Give ALL the below parameters to see the corresponding \'Passes Analysis\'')
    .showHelpAfterError('add --help for additional information')
    .helpOption('-h, --help', 'Display help for command')
    .requiredOption('--op1 <op1>',              'Give the op ID from operator 1   ->     {1, x}')
    .requiredOption('--op2 <op2>',              'Give the op ID from operator 2   ->     {1, x}')
    .requiredOption('--datefrom <datefrom>',    'Give a starting date             ->     YYYY-MM-DD%20HH-MM-SS')
    .requiredOption('--dateto <dateto>',        'Give ending date                 ->     YYYY-MM-DD%20HH-MM-SS')
    .requiredOption('--format <format>',        'Give the required format         ->     {json, csv}')
    .action((options)=> {
        pacall(options.op1, options.op2, options.datefrom, options.dateto, options.format);
    });
    

program 
    .command('passescost')
    .description('Give ALL the below parameters to see the corresponding \'Passes Cost\'')
    .showHelpAfterError('add --help for additional information')
    .helpOption('-h, --help', 'Display help for command')
    .requiredOption('--op1 <op1>',              'Give the op ID from operator 1   ->     {1, x}')
    .requiredOption('--op2 <op2>',              'Give the op ID from operator 2   ->     {1, x}')
    .requiredOption('--datefrom <datefrom>',    'Give a starting date             ->     YYYY-MM-DD%20HH-MM-SS')
    .requiredOption('--dateto <dateto>',        'Give ending date                 ->     YYYY-MM-DD%20HH-MM-SS')
    .requiredOption('--format <format>',        'Give the required format         ->     {json, csv}')
    .action((options)=> {
        pccall(options.op1, options.op2, options.datefrom, options.dateto, options.format);
    });

program
    .command('chargesby')
    .description('Give ALL the below parameters to see the corresponding \'Charges by\'')
    .showHelpAfterError('add --help for additional information')
    .helpOption('-h, --help', 'Display help for command')
    .requiredOption('--op1 <op1>',              'Give the op ID from operator 1   ->     {1, x}')
    .requiredOption('--datefrom <datefrom>',    'Give a starting date             ->     YYYY-MM-DD%20HH-MM-SS')
    .requiredOption('--dateto <dateto>',        'Give ending date                 ->     YYYY-MM-DD%20HH-MM-SS')
    .requiredOption('--format <format>',        'Give the required format         ->     {json, csv}')
    .action((options)=> {
        cbcall(options.op1, options.datefrom, options.dateto, options.format);
    });

// CLI options for admin users










program.parse(process.argv);