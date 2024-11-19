import { gql } from "@apollo/client";

export const GET_ADS = gql`
  query GetAds($categoryId: Int, $limit: Int, $offset: Int) {
    ads(categoryId: $categoryId, limit: $limit, offset: $offset) {
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

export const GET_TOTAL_ADS = gql`
  query GetTotalAds($categoryId: Int) {
    totalAds(categoryId: $categoryId)
  }
`;

export const GET_AD = gql`
  query GetAd($id: Int!) {
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
