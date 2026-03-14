import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const SearchDoc = z
  .object({
    key: z.string(),
    title: z.string(),
    author_name: z.array(z.string()),
    author_key: z.array(z.string()),
    cover_i: z.number().int().nullable(),
    first_publish_year: z.number().int().nullable(),
    edition_count: z.number().int().nullable(),
    subject: z.array(z.string()),
    isbn: z.array(z.string()),
  })
  .partial()
  .passthrough();
const SearchResponse = z
  .object({
    numFound: z.number().int(),
    start: z.number().int(),
    numFoundExact: z.boolean().optional(),
    docs: z.array(SearchDoc),
  })
  .passthrough();
const TextValue = z
  .object({ type: z.string(), value: z.string() })
  .partial()
  .passthrough();
const OLRef = z.object({ key: z.string() }).passthrough();
const Work = z
  .object({
    key: z.string(),
    title: z.string(),
    description: z.union([z.string(), TextValue]).nullable(),
    covers: z.array(z.number().int()).nullable(),
    subjects: z.array(z.string()).nullable(),
    authors: z
      .array(z.object({ author: OLRef, type: OLRef }).partial().passthrough())
      .nullable(),
    first_publish_date: z.string().nullable(),
  })
  .partial()
  .passthrough();
const Author = z
  .object({
    key: z.string(),
    name: z.string(),
    bio: z.union([z.string(), TextValue]).nullable(),
    birth_date: z.string().nullable(),
    death_date: z.string().nullable(),
    photos: z.array(z.number().int()).nullable(),
  })
  .partial()
  .passthrough();
const AuthorWork = z
  .object({
    key: z.string(),
    title: z.string(),
    covers: z.array(z.number().int()).nullable(),
    first_publish_date: z.string().nullable(),
    description: z.union([z.string(), TextValue]).nullable(),
  })
  .partial()
  .passthrough();
const AuthorWorksResponse = z
  .object({
    links: z.object({}).partial().passthrough().nullable(),
    size: z.number().int(),
    entries: z.array(AuthorWork),
  })
  .partial()
  .passthrough();
const SubjectBook = z
  .object({
    key: z.string(),
    title: z.string(),
    authors: z.array(
      z.object({ key: z.string(), name: z.string() }).partial().passthrough()
    ),
    cover_id: z.number().int().nullable(),
    first_publish_year: z.number().int().nullable(),
  })
  .partial()
  .passthrough();
const SubjectResponse = z
  .object({
    key: z.string(),
    name: z.string(),
    work_count: z.number().int(),
    works: z.array(SubjectBook),
  })
  .partial()
  .passthrough();

export const schemas = {
  SearchDoc,
  SearchResponse,
  TextValue,
  OLRef,
  Work,
  Author,
  AuthorWork,
  AuthorWorksResponse,
  SubjectBook,
  SubjectResponse,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/authors/:authorId",
    alias: "getAuthor",
    requestFormat: "json",
    parameters: [
      {
        name: "authorId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Author,
  },
  {
    method: "get",
    path: "/authors/:authorId/works.json",
    alias: "getAuthorWorks",
    requestFormat: "json",
    parameters: [
      {
        name: "authorId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().optional().default(50),
      },
      {
        name: "offset",
        type: "Query",
        schema: z.number().int().optional().default(0),
      },
    ],
    response: AuthorWorksResponse,
  },
  {
    method: "get",
    path: "/search.json",
    alias: "searchBooks",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "title",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "author",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "fields",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().optional().default(20),
      },
      {
        name: "offset",
        type: "Query",
        schema: z.number().int().optional().default(0),
      },
      {
        name: "sort",
        type: "Query",
        schema: z.enum(["relevance", "new", "old", "random"]).optional(),
      },
    ],
    response: SearchResponse,
  },
  {
    method: "get",
    path: "/subjects/:subject",
    alias: "getSubject",
    requestFormat: "json",
    parameters: [
      {
        name: "subject",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().optional().default(20),
      },
      {
        name: "offset",
        type: "Query",
        schema: z.number().int().optional().default(0),
      },
    ],
    response: SubjectResponse,
  },
  {
    method: "get",
    path: "/works/:workId",
    alias: "getWork",
    requestFormat: "json",
    parameters: [
      {
        name: "workId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Work,
  },
]);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}

export const openLibraryClient = createApiClient("https://openlibrary.org");
