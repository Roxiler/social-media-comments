# Sample Component README

## `IProps` Interface

The `IProps` interface defines the structure of the props that are expected to be passed when using the component. It enforces a specific format for prop values, ensuring consistency and compatibility with the component.

### Interface Definition

```typescript
interface IProps {
  comments: IComment[];
  postId: string;
  onShowReplies: Function;
  onEditComment: Function;
  onDeleteComment: Function;
  onAddComment: Function;
}
```

## Prop Descriptions

This section provides detailed descriptions for the props defined in the `IProps` interface. These props are crucial for configuring and customizing the behavior of the component within your application.

### `comments` (Array of `IComment`)

- Description: An array of comments that follows the structure specified by the `IComment` interface. These comments will be displayed within the component.

### `postId` (String)

- Description: A string representing the unique identifier of the post for which comments are being loaded. This allows the component to fetch comments specific to the selected post.

### `onShowReplies` (Function)

- Description: A callback function that is triggered when a user requests to view replies to a comment. It should accept two arguments: `comment` (an object representing the comment to which replies are being loaded) and `parentComments` (an array of string IDs representing the nested comment hierarchy). Implement this function to handle the action of showing comment replies.

### `onEditComment` (Function)

- Description: A callback function that is called when a user intends to edit a comment. It should accept three arguments: `comment` (an object representing the comment to be edited), `text` (a string representing the updated comment text), and `parentComments` (an array of string IDs representing the nested comment hierarchy). Implement this function to handle the action of editing comments.

### `onDeleteComment` (Function)

- Description: A callback function that is invoked when a user intends to delete a comment. It should accept three arguments: `comment` (an object representing the comment to be deleted), `parentId` (the ID of the parent comment, if applicable), and `parentComments` (an array of string IDs representing the nested comment hierarchy). Implement this function to handle the action of deleting comments.

### `onAddComment` (Function)

- Description: A callback function that is used when a user wants to add a new comment or reply. It should accept four arguments: `postId` (a string representing the post ID where the new comment is added), `parentId` (the ID of the parent comment, if applicable), `text` (a string representing the content of the new comment), and `parentComments` (an array of string IDs representing the nested comment hierarchy). Implement this function to handle the action of adding new comments.

By referring to these descriptions, you can ensure that the props are correctly utilized and configured within the component to meet your application's specific requirements.


## `postId` Prop

The `postId` prop is a fundamental parameter that represents the unique identifier of the post for which comments are being loaded. This prop is crucial for the component to fetch and display comments specific to the selected post.

### Usage

When implementing the component, ensure that you provide the correct `postId` value to load comments associated with the targeted post. The component will use this identifier to fetch and display the relevant comments, maintaining data separation for different posts.


## `comments` Prop

The `comments` prop should be an array of objects. Each object in the array should follow the following pattern:

```json
[
  {
    "id": "14d3479f-61df-4f87-bf24-065dbd5f87f0",
    "commentor": "Kyle",
    "actions": ["EDIT", "DELETE"],
    "value": "I am a root comment",
    "totalComments": 2,
    "comments": [],
    "createdAt": "2023-10-04T05:22:29.437Z",
    "updatedAt": "2023-10-04T05:22:29.437Z",
    "postId": "15499a21-ac4c-4075-ab39-f1c9e8c70719"
  },
  {
    "id": "836911b1-ed36-4807-a776-51c96bdc20a2",
    "commentor": "Sally",
    "actions": ["DELETE"],
    "value": "I am another root comment",
    "totalComments": 2,
    "comments": [],
    "createdAt": "2023-09-25T05:59:05.100Z",
    "updatedAt": "2023-09-25T05:59:05.100Z",
    "postId": "15499a21-ac4c-4075-ab39-f1c9e8c70719"
  }
]
```

### Individual Comment Interface

To define the structure of individual comments, you can use the following TypeScript interface:

```ts
interface IComment {
  id: string;
  commentor: string;
  actions: Array<"EDIT" | "DELETE"> | [];
  value: string;
  totalComments: number;
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
  postId: string;
}
```

You can use this interface as a reference when working with individual comment objects within your component.

Please make sure that the comments prop adheres to the specified structure, and individual comment objects conform to the IComment interface.

## `onShowReplies` Prop

The `onShowReplies` prop is a callback function that is used to load and display replies for a specific comment. It accepts two arguments:

1. `comment` (Object): The object representing the comment for which replies are to be loaded.
2. `parentComments` (Array of Strings): An array of string IDs representing the path from the root comment to the specific comment on which the action is to be taken.

### Example Implementation

Here's an example implementation of the `onShowReplies` function:

```javascript
const handleShowReplies = async (comment, parentComments) => {
  // Fetch replies for the specified comment
  const response = await getRepliesOnComments(comment.id);

  // Create an array of response comments with random actions (EDIT, DELETE, or none)
  const responseCommentsList = response.map((comment) => {
    const combos = [['EDIT', 'DELETE'], ['DELETE'], []];
    const num = Math.floor(Math.random() * 3);
    return {
      id: comment.id,
      commentor: "John Doe",
      value: comment.message,
      totalComments: comment.children.length,
      comments: [],
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      postId: comment.postId,
      actions: combos[num]
    };
  });

  // Recursive function to update the comments list
  const getArrayData = (comments, i) => {
    if (i >= parentComments.length) {
      return responseCommentsList;
    }

    comments.forEach((comment) => {
      if (comment.id === parentComments[i]) {
        comment.comments = getArrayData(comment.comments, i + 1);
      }
    });

    return comments;
  };

  // Update the comments list with the new replies
  const newArr = getArrayData(commentsList, 0);
  setCommentsList([...newArr]);

  // Return the loaded response comments
  return responseCommentsList;
};
```

In this example, the function fetches replies for the specified comment, creates a list of response comments with random actions, and then updates the comments list to include the new replies. The updated comments list is then set using setCommentsList, and the loaded response comments are returned.

You can customize the onShowReplies function according to your specific application requirements, but it should always follow the pattern of accepting the comment object and parentComments array, fetching and processing data, and updating the comments list accordingly.


## `onEditComment` Prop

The `onEditComment` prop is a callback function that allows you to update a specific comment. It accepts three parameters:

1. `comment` (Object): The object representing the comment that needs to be updated.
2. `text` (String): A string parameter that contains the updated comment text.
3. `parentComments` (Array of Strings): An array of string IDs representing the path from the root comment to the specific comment on which the action is to be taken.

### Example Implementation

Here's an example implementation of the `onEditComment` function:

```javascript
const handleEditComment = async (comment, text, parentComments) => {
  // Update the comment text via an API call or any other method
  const response = await updateComment({
    postId: comment.postId,
    message: text,
    id: comment.id,
  });

  // Recursive function to update the comments list
  const getArrayData = (comments, i) => {
    if (i === parentComments.length) {
      // Update the value of the edited comment
      const newCommentsArray = comments.map((c) => {
        if (c.id === comment.id) {
          c.value = response.message;
        }
        return c;
      });
      return newCommentsArray;
    }

    comments.forEach((comment) => {
      if (comment.id === parentComments[i]) {
        comment.comments = getArrayData(comment.comments, i + 1);
      }
    });

    return comments;
  };

  // Update the comments list with the edited comment
  const newArr = getArrayData(commentsList, 0);
  setCommentsList([...newArr]);
};
```

In this example, the onEditComment function updates the comment text using an API call or any other method. It then uses a recursive function to update the comments list by finding the specific comment based on the provided comment and parentComments, and it updates the value of the edited comment. Finally, the comments list is updated with the edited comment using setCommentsList.

You can customize the onEditComment function according to your specific application requirements, but it should follow the pattern of accepting the comment object, text, and parentComments, updating the comment text, and updating the comments list accordingly.

## `onAddComment` Prop

The `onAddComment` prop is a callback function that allows you to add a new comment as a reply to an existing comment. It accepts four parameters:

1. `postId` (String): A string that represents the post ID where the comment is being added.
2. `parentId` (String): A string that represents the ID of the parent comment to which the new reply is being added.
3. `text` (String): A string that represents the text of the new comment to be added.
4. `parentComments` (Array of Strings): An array of string IDs representing the path from the root comment to the specific comment on which the action is to be taken.

### Example Implementation

Here's an example implementation of the `onAddComment` function:

```javascript
const handleAddComment = async (postId, parentId, text, parentComments) => {
  // Create a new comment via an API call or any other method
  const response = await createComment({
    postId: postId,
    message: text,
    parentId: parentId,
  });

  // Define random action combinations for the new comment
  const combos = [['EDIT', 'DELETE'], ['DELETE'], []];
  const num = Math.floor(Math.random() * 3);

  // Create the new comment object
  const newComment = {
    id: response.id,
    commentor: response.user.name,
    value: response.message,
    totalComments: 0,
    comments: [],
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    postId: response.postId,
    actions: combos[num]
  };

  // Recursive function to add the new comment to the comments list
  const getArrayData = (comments, i) => {
    if (i === parentComments.length) {
      const newCommentsArray = [newComment, ...comments];
      return newCommentsArray;
    }

    comments.forEach((comment) => {
      if (comment.id === parentComments[i]) {
        comment.comments = getArrayData(comment.comments, i + 1);
      }
    });

    return comments;
  };

  // Update the comments list with the new comment
  const newArr = getArrayData(commentsList, 0);
  setCommentsList([...newArr]);
};
```

In this example, the onAddComment function creates a new comment via an API call or any other method. It defines random action combinations for the new comment, creates the new comment object, and then uses a recursive function to add the new comment to the comments list. The comments list is updated with the new comment using setCommentsList.

You can customize the onAddComment function according to your specific application requirements, but it should follow the pattern of accepting postId, parentId, text, and parentComments, creating the new comment, and updating the comments list accordingly.


## `onDeleteComment` Prop

The `onDeleteComment` prop is a callback function that allows you to delete a specific comment. It accepts three parameters:

1. `comment` (Object): The object representing the comment that needs to be deleted.
2. `parentId` (String): The ID of the parent comment to which the comment being deleted belongs.
3. `parentComments` (Array of Strings): An array of string IDs representing the path from the root comment to the specific comment on which the action is to be taken.

### Example Implementation

Here's an example implementation of the `onDeleteComment` function:

```javascript
const handleDeleteComment = async (comment, parentId, parentComments) => {
  // Delete the comment via an API call or any other method
  await onDeleteComment({
    postId: comment.postId,
    id: comment.id,
  });

  // Recursive function to remove the deleted comment from the comments list
  const getArrayData = (comments, i) => {
    if (i === parentComments.length) {
      const newCommentsArray = comments.filter((c) => c.id !== comment.id);
      return newCommentsArray;
    }

    comments.forEach((comment) => {
      if (comment.id === parentComments[i]) {
        comment.comments = getArrayData(comment.comments, i + 1);
      }
    });

    return comments;
  };

  // Update the comments list by removing the deleted comment
  const newArr = getArrayData(commentsList, 0);
  setCommentsList([...newArr]);
};
```

In this example, the onDeleteComment function deletes the specified comment via an API call or any other method. It then uses a recursive function to remove the deleted comment from the comments list based on the provided comment, parentId, and parentComments. The updated comments list is set using setCommentsList.

You can customize the onDeleteComment function according to your specific application requirements, but it should follow the pattern of accepting the comment object, parentId, and parentComments, deleting the comment, and updating the comments list accordingly.

## Model Schemas for Your Database

When working with the comments component in your application, it's essential to have a well-structured database schema that aligns with the component's requirements. Below, we provide a set of model schemas as an example. You can adapt these schemas to your specific database technology and needs.

## Post Model

### Post Schema

The `Post` model represents a post in your application. It includes the following fields:

- `id` (String): A unique identifier for the post.
- `title` (String): The title of the post.
- `body` (String): The content of the post.
- `comments` (Comment[]): A relation to comments associated with this post.

### Example Post Schema

```prisma
model Post {
  id       String    @id @default(uuid())
  title    String
  body     String
  comments Comment[]
}
```

## User Model

The `User` model represents a user in your application. It includes essential information about users and their interactions with your platform.

### User Schema

Here's a breakdown of the fields in the `User` model:

- `id` (String): A unique identifier for the user.
- `name` (String): The name of the user.
- `comments` (Comment[]): A relation to comments made by this user.

### Example User Schema

```prisma
model User {
  id       String    @id @default(uuid())
  name     String
  comments Comment[]
}
```

## Comment Model

The `Comment` model represents individual comments in your application. It plays a central role in managing user interactions and discussions within your platform.

### Comment Schema

Here's a breakdown of the fields in the `Comment` model:

- `id` (String): A unique identifier for the comment.
- `message` (String): The content of the comment.
- `createdAt` (DateTime): The timestamp when the comment was created.
- `updatedAt` (DateTime): The timestamp when the comment was last updated.
- `user` (User): A relation to the user who posted the comment.
- `userId` (String): A reference to the user's ID.
- `post` (Post): A relation to the post to which the comment belongs.
- `postId` (String): A reference to the post's ID.
- `parent` (Comment, optional): A relation to the parent comment if this is a reply.
- `children` (Comment[]): A relation to child comments if this comment has replies.
- `parentId` (String, optional): A reference to the parent comment's ID.

### Example Comment Schema

```prisma
model Comment {
  id        String    @id @default(uuid())
  message   String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  post      Post      @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId    String
  parent    Comment?  @relation("ParentChild", fields: [parentId], references: [id], onDelete: Cascade)
  children  Comment[] @relation("ParentChild")
  parentId  String?
}
```

**These model schemas provide a solid foundation for structuring your database to work seamlessly with the comments component. You can customize them according to your database technology and specific application requirements. The key is to ensure that the data structure aligns with the general standards mentioned earlier for the comment array and the comment interface used by the component.**


## Updating Comment Lists

For every action that is to be performed within the component, it's crucial to regenerate or update the comment list and provide the completely updated list to the component. This ensures that the component reflects the latest state of comments and maintains data consistency.

The provided sample functions in the documentation are designed to ease this process. Users can implement these functions according to their convenience, adapting them to their backend logic, database operations, or API calls.

The provided samples serve as guidelines for the expected behavior of the action props (`onShowReplies`, `onEditComment`, `onAddComment`, and `onDeleteComment`) and demonstrate how these actions should affect the comment list.

By following these patterns and updating the comment list as necessary, you can ensure that the component accurately reflects the state of comments and maintains a seamless user experience.

Feel free to customize and extend these functions to match your specific application requirements and data management practices. Consistently updating the comment list is a key factor in ensuring the reliability and functionality of the component.
