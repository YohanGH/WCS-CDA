import { gql } from "@apollo/client";

export const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      title
    }
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTag($data: CreateTagInput!) {
    createTag(data: $data) {
      id
      title
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($data: UpdateTagInput!, $updateTagId: Int!) {
    updateTag(data: $data, id: $updateTagId) {
      id
      title
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($deleteTagId: Int!) {
    deleteTag(id: $deleteTagId)
  }
`;
