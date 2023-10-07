import { makeRequest } from "./makeRequest"

export function createComment({ postId, message, parentId }: any) {
  return makeRequest(`posts/${postId}/comments`, {
    method: "POST",
    data: { message, parentId },
  })
}

export function updateComment({ postId, message, id }: any) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: "PUT",
    data: { message },
  })
}

export function onDeleteComment({ postId, id }: any) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: "DELETE",
  })
}

export function toggleCommentLike({ id, postId }: any) {
  return makeRequest(`/posts/${postId}/comments/${id}/toggleLike`, {
    method: "POST",
  })
}

export function getCommentsOnPost(postId: any) {
  return makeRequest(`/posts/${postId}/comments`, {
    method: "GET",
  })
}

export function getRepliesOnComments(id: any) {
  return makeRequest(`/comments/${id}`, {
    method: "GET",
  })
}