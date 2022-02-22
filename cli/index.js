#! /usr/bin/env node --no-warnings
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const commander = require("commander");
const axios = require ('axios');
const program = new commander.Command();

const ppscall=require('./commands/PassesPerStation.js');
const pacall=require('./commands/PassesAnalysis.js');
const pccall=require('./commands/PassesCost.js');
const cbcall=require('./commands/ChargesBy.js');

const apu=require('./adminCommands/PassesUpd.js');

program 
    .version('1.0.0')
    .description('Command Line Interface Software Engineering NTUA 2022');

//CLI options for basic operations:
program
    .command('passesperstation')
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
    .showHelpAfterError('add --help for additional information')
    .helpOption('-h, --help', 'Display help for command')
    .requiredOption('--op1 <op1>',              'Give the op ID from operator 1   ->     {1, x}')
    .requiredOption('--datefrom <datefrom>',    'Give a starting date             ->     YYYY-MM-DD%20HH-MM-SS')
    .requiredOption('--dateto <dateto>',        'Give ending date                 ->     YYYY-MM-DD%20HH-MM-SS')
    .requiredOption('--format <format>',        'Give the required format         ->     {json, csv}')
    .action((options)=> {
        cbcall(options.op1, options.datefrom, options.dateto, options.format);
    });

//CLI "admin" commands
program 
    .command('healthcheck')
    .showHelpAfterError('add --help for additional information')
    .helpOption('-h, --help', 'Display help for command')
    .action(function(){
        let url='https://localhost:9103/interoperability/api/admin/healthcheck';
        axios.get(url).then( resp=>{
            console.log(resp.data);
        })
    });

program 
    .command('resetpasses')
    .showHelpAfterError('add --help for additional information')
    .helpOption('-h, --help', 'Display help for command')
    .action(function(){
        let url='https://localhost:9103/interoperability/api/admin/resetpasses';
        axios.post(url).then( resp=>{
            console.log(resp.data);
        })
    });

program 
    .command('resetvehicles')
    .showHelpAfterError('add --help for additional information')
    .helpOption('-h, --help', 'Display help for command')
    .action(function(){
        let url='https://localhost:9103/interoperability/api/admin/resetvehicles';
        axios.post(url).then( resp=>{
            console.log(resp.data);
        })
    });
program
    .command('resetstations')
    .showHelpAfterError('add --help for additional information')
    .helpOption('-h, --help', 'Display help for command')
    .action(function(){
        let url='https://localhost:9103/interoperability/api/admin/resetstations';
        axios.post(url).then( resp=>{
            console.log(resp.data);
        })
    });
// CLI options for admin users
program 
    .command('admin')
    .showHelpAfterError('add --help for additional information')
    .helpOption('-h, --help', 'Display help for command')
    .option('--passesupd',               'Don\'t give any argument           ->      {}')
    .option('--source',                  'Give the path to the file         ->      \"/data/newpassesXXXX.csv\"')
    .action((options)=>{
        if(options.passesupd!=undefined && options.source==undefined)
            console.error('Argument \'--pasesupd\' must be followes by \'--source\'');
        else if(options.passesupd!=undefined)
            apu(options.source);
    });










program.parse(process.argv);