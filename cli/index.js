#! /usr/bin/env node

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const commander = require("commander");
const program = new commander.Command();

// console.log("HELLO");

program 
    .version('1.0.0')
    .description('Command Line Interface Software Engineering NTUA 2022');

program
    .command('passesperstation')
    .alias('pps')
    .requiredOption('--station <stationID>', 'Give a stationID')
    .requiredOption('--datefrom <datefrom>', 'Give a starting date')
    .requiredOption('--dateto <dateto>', 'Give ending date')
    .requiredOption('--format <format>', 'Give the required format')
    .action((options)=>{
        console.log("ok")
    });

program 
    .command('passesanalysis')
    .alias('pa')
    .requiredOption('--op1 <operatorID1>', 'Give the operator ID from Operator 1')
    .requiredOption('--op2 <operatorID2>', 'Give the operator ID from Operator 2')
    .requiredOption('--datefrom <datefrom>', 'Give a starting date')
    .requiredOption('--dateto <dateto>', 'Give ending date')
    .requiredOption('--format <format>', 'Give the required format')
    .action((options)=>{
        console.log("ok1")
    });

program 
    .command('passescost')
    .alias('pc')
    .requiredOption('--op1 <operatorID1>', 'Give the operator ID from Operator 1')
    .requiredOption('--op2 <operatorID2>', 'Give the operator ID from Operator 2')
    .requiredOption('--datefrom <datefrom>', 'Give a starting date')
    .requiredOption('--dateto <dateto>', 'Give ending date')
    .requiredOption('--format <format>', 'Give the required format')
    .action((options)=>{
        console.log("ok2")
    });

program
    .command('chargeby')
    .alias('cb')
    .requiredOption('--op1 <operatorID1>', 'Give the operator ID from Operator 1')
    .requiredOption('--datefrom <datefrom>', 'Give a starting date')
    .requiredOption('--dateto <dateto>', 'Give ending date')
    .requiredOption('--format <format>', 'Give the required format')
    .action((options)=>{
        console.log("ok2")
    });

program 
    .command('healthcheck')
    .alias('hc')
    .description('Confirms end-to-end connectivity')
    .action(function(cmdObj){
        console.log("ok3")
    });

program 
    .command('resetpasses')
    .alias('rp')
    .description('Resests table passes.sql')
    .action(function(cmdObj){
        console.log("ok3")
    });

program 
    .command('resetvehicles')
    .alias('rv')
    .description('Resests table vehicles.sql')
    .action(function(cmdObj){
        console.log("ok3")
    });

program
    .command('resetstations')
    .alias('rs')
    .description('Resests table stations.sql')
    .action(function(cmdObj){
        console.log("ok4")
    }); 

program 
    .command('admin')
    .alias('ad')
    .description('insert data')
    .action(function(cmdObj){
        console.log("ok4")
    });

program.parse(process.argv);