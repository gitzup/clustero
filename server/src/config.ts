import { createConfig, StringConfigValue } from "@gitzup/config";

export const config = createConfig( {
    web: {
        reverseProxy: {
            trustLevels: new StringConfigValue( { default: "loopback, 130.211.0.0/22" } )
        }
    }
} );
