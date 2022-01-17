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
    .requiredOption('--op1 <op1>', 'Give the op ID from operator 1')
    .requiredOption('--op2 <op2>', 'Give the op ID from operator 2')
    .requiredOption('--datefrom <datefrom>', 'Give a starting date')
    .requiredOption('--dateto <dateto>', 'Give ending date')
    .requiredOption('--format <format>', 'Give the required format')
    .action((options)=>{
        console.log("ok1")
    });

program 
    .command('passescost')
    .alias('pc')
    .requiredOption('--op1 <op1>', 'Give the op ID from operator 1')
    .requiredOption('--op2 <op2>', 'Give the op ID from operator 2')
    .requiredOption('--datefrom <datefrom>', 'Give a starting date')
    .requiredOption('--dateto <dateto>', 'Give ending date')
    .requiredOption('--format <format>', 'Give the required format')
    .action((options)=>{
        console.log("ok2")
    });

program
    .command('chargeby')
    .alias('cb')
    .requiredOption('--op1 <op1>', 'Give the op ID from operator 1')
    .requiredOption('--datefrom <datefrom>', 'Give a starting date')
    .requiredOption('--dateto <dateto>', 'Give ending date')
    .requiredOption('--format <format>', 'Give the required format')
    .action((options)=>{
        console.log("ok3")
    });











program.parse(process.argv);