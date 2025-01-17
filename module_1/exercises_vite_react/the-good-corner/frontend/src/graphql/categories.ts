import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      title
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) { 
      id
      title
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation Mutation($data: UpdateCategoryInput!, $updateCategoryId: Int!) {
    updateCategory(data: $data, id: $updateCategoryId) {
      id
      title
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation Mutation($deleteCategoryId: Int!) {
    deleteCategory(id: $deleteCategoryId)
  }
`;
