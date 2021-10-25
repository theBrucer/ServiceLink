/* 
    Each filter has its own enums
*/

// Sort by -> Radio buttons (mutually exclusive)
export const NEWEST_FIRST = "NEWEST_FIRST"; // DEFAULT 
export const OLDEST_FIRST = "OLDEST_FIRST";

// Job Status - Radio Buttons (mutually exclusive)
export const ALL_JOBS = "ALL_JOBS"; // DEFAULT
export const JOB_REJECTED = "JOB_REJECTED";
export const JOB_ACCEPTED = "JOB_ACCEPTED";

// Technician Response -> checkbox style, multiple choices can be selected (at least one)
export const TECHNICIAN_ACCEPTED = "TECHNICIAN_ACCEPTED";
export const TECHNICIAN_PENDING = "TECHNICIAN_PENDING";
export const TECHNICIAN_REJECTED = "TECHNICIAN_REJECTED";