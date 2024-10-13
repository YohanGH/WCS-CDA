import React from "react";
import { useParams } from "react-router-dom";
import AdList from "../components/sections/RecentAds";

const Category: React.FC = () => {
  const { id } = useParams<{ id: string}>();

  return (
    <div>
      <div>
        <AdList categoryId={id}/>
      </div>
    </div>
  );
};

export default Category;
