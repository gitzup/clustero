import { config } from "./config";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as methodOverride from "method-override";
import { EXIT_GENERAL_ERROR, EXIT_NODEMON_REFRESH, EXIT_USER_INTERRUPT } from "./exit_codes";

Promise.resolve()
       .then( () => process.on( "unhandledRejection", e => console.error( "Unhandled promise rejection", e ) ) )
       .then( () => process.once( "SIGUSR2", () => {
           console.warn( "Gracefully shutting down from SIGUSR2 (nodemon)" );
           process.exit( EXIT_NODEMON_REFRESH );
       } ) )
       .then( () => process.on( "SIGINT", function() {
           console.warn( "Gracefully shutting down from SIGINT (Ctrl-C)" );
           process.exit( EXIT_USER_INTERRUPT );
       } ) )
       .then( () => new Promise( ( resolve, reject ) => {
           express().disable( "x-powered-by" )
                    .set( "trust proxy", config.web.reverseProxy.trustLevels.value )
                    .use( methodOverride( "x-http-method-override" ) )
                    .use( bodyParser.urlencoded( { extended: false } ) )
                    .use( bodyParser.json() )
                    .get( "/health", ( req, res ) => res.status( 200 ).send( "OK" ) )
                    .listen( 4000, ( err: any ) => err ? reject( err ) : resolve() );
       } ) )
       .then( () => console.info( `Started Clustero server in ${config.env.value.toUpperCase()} mode` ) )
       .catch( err => {
           console.error( `Failed starting Devbot server`, err );
           process.exit( EXIT_GENERAL_ERROR );
       } );
