import { zodToJsonSchema } from "zod-to-json-schema";
import { ContractSchema } from "../src/mod.ts";

const jsonSchema = zodToJsonSchema(ContractSchema, "ContractSchema");

console.log(JSON.stringify(jsonSchema, null, 2)); 
