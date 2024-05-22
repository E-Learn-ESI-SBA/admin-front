export const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:8080"
const MATERIALS_URL = `${SERVER_URL}`
export const GET_MODULES = `${MATERIALS_URL}/modules/admin`
export const CREATE_MODULE = `${MATERIALS_URL}/modules`
export const GET_MODULE = `${MATERIALS_URL}/modules`
export const DELETE_MODULE = `${MATERIALS_URL}/modules`
export const GET_COURSES = `${MATERIALS_URL}/courses`
export const GET_SECTIONS =    `${MATERIALS_URL}/sections`
