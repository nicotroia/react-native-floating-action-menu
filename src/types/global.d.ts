/**
 * Useful for turning a string literal union type into an enum of sorts.
 * Every value in the union must be included, and both the key and value
 * must be equal to that value in the union.
 */
type TypeMap<T extends PropertyKey> = { [K in T]: T };
