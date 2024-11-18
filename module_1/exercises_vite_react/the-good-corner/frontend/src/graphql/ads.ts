import { gql } from "@apollo/client";

export const GET_ADS = gql`
  query GetAds($categoryId: Int) {
    ads(categoryId: $categoryId) {
      id
      title
      price
      picture
      category {
        id
        title
      }
      tags {
        id
        title
      }
    }
  }
`;

export const GET_AD = gql`
  query GetAd($id: ID!) {
    ad(id: $id) {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
      category {
        id
      }
      tags {
        id
      }
    }
  }
`;

export const CREATE_AD = gql`
  mutation CreateAd($ad: AdInput!) {
    createAd(ad: $ad) {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
    }
    category {
      id
    }
    tags {
      id
    }
  }
`;

export const DELETE_AD = gql`
  mutation DeleteAd($id: ID!) {
    deleteAd(id: $id) {
      success
      message
    }
  }
`;
