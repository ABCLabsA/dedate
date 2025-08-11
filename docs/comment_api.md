/comment/add-comment

1. 父级评论(顶级评论)
{
  "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
  "content": "777顶级评论",
  "parentId": null,
  "rootId": null,
  "replyToId": null
}

{
    "code": 200,
    "message": "创建评论成功",
    "data": {
        "id": "027f9334-eacb-4e56-836b-7564df93b22b",
        "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
        "user": {
            "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "name": "幽默的启发者438",
            "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
        },
        "content": "666顶级评论",
        "parentId": null,
        "rootId": null,
        "replyUser": null,
        "likesCount": 0,
        "dislikesCount": 0,
        "repliesCount": 0,
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-08-10T20:25:43.268Z",
        "updatedAt": "2025-08-10T20:25:43.268Z"
    }
}

2. 子评论直接回复父级评论
{
  "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
  "content": "777-777真的吗楼主666，太搞笑了",
  "parentId": "0fcbec0f-4b48-4f49-801e-b55dfd9ed854", 
  "rootId": "0fcbec0f-4b48-4f49-801e-b55dfd9ed854", 
  "replyToId": null
}

{
    "code": 200,
    "message": "创建评论成功",
    "data": {
        "id": "df1b93a8-0a56-4f7b-af96-4972c4256110",
        "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
        "user": {
            "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "name": "幽默的启发者438",
            "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
        },
        "content": "777真的吗楼主666，太搞笑了",
        "parentId": "0fcbec0f-4b48-4f49-801e-b55dfd9ed854",
        "rootId": "0fcbec0f-4b48-4f49-801e-b55dfd9ed854",
        "replyUser": null,
        "likesCount": 0,
        "dislikesCount": 0,
        "repliesCount": 0,
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-08-10T20:26:27.734Z",
        "updatedAt": "2025-08-10T20:26:27.734Z"
    }
}

3. 子评论回复子评论
{
  "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
  "content": "@幽默的启发者438 444-444-444回复子评论，需要加上@用户标识",
  "parentId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a", 
  "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
  "replyToId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a"
}

{
    "code": 200,
    "message": "创建评论成功",
    "data": {
        "id": "87fb8839-1c34-431f-a04a-435e30b6333d",
        "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
        "user": {
            "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "name": "幽默的启发者438",
            "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
        },
        "content": "@幽默的启发者438 444-444-444回复子评论，需要加上@用户标识",
        "parentId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
        "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
        "replyUser": null,
        "likesCount": 0,
        "dislikesCount": 0,
        "repliesCount": 0,
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-08-10T20:04:22.534Z",
        "updatedAt": "2025-08-10T20:04:22.534Z"
    }
}


获取顶级评论
/comment/list
query:
projectId fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e
page 1
limit 10

{
    "code": 200,
    "message": "获取项目评论列表成功",
    "data": [
        {
            "id": "23fe12f8-f130-4102-9232-847e4d3ee20e",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "777-777真的吗楼主666，太搞笑了",
            "parentId": "0fcbec0f-4b48-4f49-801e-b55dfd9ed854",
            "rootId": "0fcbec0f-4b48-4f49-801e-b55dfd9ed854",
            "replyToId": null,
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:26:38.323Z",
            "updatedAt": "2025-08-10T20:26:38.323Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "df1b93a8-0a56-4f7b-af96-4972c4256110",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "777真的吗楼主666，太搞笑了",
            "parentId": "0fcbec0f-4b48-4f49-801e-b55dfd9ed854",
            "rootId": "0fcbec0f-4b48-4f49-801e-b55dfd9ed854",
            "replyToId": null,
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:26:27.734Z",
            "updatedAt": "2025-08-10T20:26:27.734Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "0fcbec0f-4b48-4f49-801e-b55dfd9ed854",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "777顶级评论",
            "parentId": null,
            "rootId": "0fcbec0f-4b48-4f49-801e-b55dfd9ed854",
            "replyToId": null,
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 2,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:25:50.476Z",
            "updatedAt": "2025-08-10T20:26:38.694Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "027f9334-eacb-4e56-836b-7564df93b22b",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "666顶级评论",
            "parentId": null,
            "rootId": "027f9334-eacb-4e56-836b-7564df93b22b",
            "replyToId": null,
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:25:43.268Z",
            "updatedAt": "2025-08-10T20:25:43.576Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "1efe6985-16e1-4354-ba69-6ec5e057c4dd",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "555顶级评论",
            "parentId": null,
            "rootId": "1efe6985-16e1-4354-ba69-6ec5e057c4dd",
            "replyToId": null,
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:25:34.334Z",
            "updatedAt": "2025-08-10T20:25:35.001Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "87fb8839-1c34-431f-a04a-435e30b6333d",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "@幽默的启发者438 444-444-444回复子评论，需要加上@用户标识",
            "parentId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "replyToId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:04:22.534Z",
            "updatedAt": "2025-08-10T20:04:22.534Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "83156d8a-8a8a-49e4-acb9-e4e68d17cfc2",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "@幽默的启发者438 444-444回复子评论，需要加上@用户标识",
            "parentId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "replyToId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:04:15.294Z",
            "updatedAt": "2025-08-10T20:04:15.294Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "6c57f425-96a9-479a-b000-5fffc16e9cca",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "@幽默的启发者438 444回复子评论，需要加上@用户标识",
            "parentId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "replyToId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:04:07.494Z",
            "updatedAt": "2025-08-10T20:04:07.494Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "444-444-444真的吗楼主666，太搞笑了",
            "parentId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "replyToId": null,
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:03:38.793Z",
            "updatedAt": "2025-08-10T20:03:38.793Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "10aa0d81-8468-4284-ac52-9a47835d7451",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "444-444真的吗楼主666，太搞笑了",
            "parentId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "replyToId": null,
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:03:29.353Z",
            "updatedAt": "2025-08-10T20:03:29.353Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        }
    ]
}


获取顶级评论的更多回复
/comment/replies
query:
rootId 2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b
page 1
limit 10

{
    "code": 200,
    "message": "获取更多回复成功",
    "data": [
        {
            "id": "de5efb52-e14d-4657-9a46-230b1a71a61d",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "444-真的吗楼主666，太搞笑了",
            "parentId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "replyToId": null,
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:03:19.004Z",
            "updatedAt": "2025-08-10T20:03:19.004Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "10aa0d81-8468-4284-ac52-9a47835d7451",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "444-444真的吗楼主666，太搞笑了",
            "parentId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "replyToId": null,
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:03:29.353Z",
            "updatedAt": "2025-08-10T20:03:29.353Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "444-444-444真的吗楼主666，太搞笑了",
            "parentId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "replyToId": null,
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:03:38.793Z",
            "updatedAt": "2025-08-10T20:03:38.793Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "6c57f425-96a9-479a-b000-5fffc16e9cca",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "@幽默的启发者438 444回复子评论，需要加上@用户标识",
            "parentId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "replyToId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:04:07.494Z",
            "updatedAt": "2025-08-10T20:04:07.494Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "83156d8a-8a8a-49e4-acb9-e4e68d17cfc2",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "@幽默的启发者438 444-444回复子评论，需要加上@用户标识",
            "parentId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "replyToId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:04:15.294Z",
            "updatedAt": "2025-08-10T20:04:15.294Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        },
        {
            "id": "87fb8839-1c34-431f-a04a-435e30b6333d",
            "projectId": "fdcbf0a8-98a5-4f23-a2fd-9b748c0a215e",
            "userId": "21d3870d-915c-4bc8-a216-b9d278523b24",
            "content": "@幽默的启发者438 444-444-444回复子评论，需要加上@用户标识",
            "parentId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "rootId": "2cf46eb4-a3fc-4ca3-bc0f-bc2c5e5ecd7b",
            "replyToId": "2a5c3ab2-6f30-4a05-b4a7-945b8dcc193a",
            "likesCount": 0,
            "dislikesCount": 0,
            "repliesCount": 0,
            "isDeleted": false,
            "deletedAt": null,
            "createdAt": "2025-08-10T20:04:22.534Z",
            "updatedAt": "2025-08-10T20:04:22.534Z",
            "user": {
                "id": "21d3870d-915c-4bc8-a216-b9d278523b24",
                "name": "幽默的启发者438",
                "avatar": "https://api.multiavatar.com/21d3870d-915c-4bc8-a216-b9d278523b24.svg"
            }
        }
    ]
}