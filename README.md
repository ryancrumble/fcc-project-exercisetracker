# Timestamp Microservice

This is the code for the Timestamp Microservice project. Instructions for
building your project can be found
at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

## Requirements

Set up four endpoints (two POSTs, two GETs)

- **POST** to `/api/users`
    - @param: { username: string }
    - @return: { username: string, _id: string }
- **GET** to `/api/users`
    - @return: { username: string, _id: string }[]
- **POST** to `/api/users/:_id/exercises`
    - @param: { description: string, duration: number, date?: Date }
    - @return: { _id: string, username: string, date: string, duration: number,
      description: string }
- **GET** to `/api/users/:_id/logs`
    - @query: ?from {string} in format YYYY-MM_DD
        - &to {string} in format YYYY-MM_DD
        - &limit {string} in format YYYY-MM_DD
    - @return: { _id: string, username: string, count: number, logs: {
      description: string, duration: string, date: Date(_from dateString)_ }[] }

## Notes

Typescript will be a big aid to creating this API.

Also considering trying out [Zod](https://zod.dev/) to create schemas for the
forms and learning how to
use this new tool.
