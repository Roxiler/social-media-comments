import { makeRequest } from "./makeRequest"

export function getPosts() {
  return makeRequest("/posts")
}

export function getPost(id: any) {
  return makeRequest(`/posts/${id}`)
}