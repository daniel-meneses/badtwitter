import React from "react";
import { connect } from "react-redux";
import { getNewsArticles } from "../../actions/explore";
import { selectExploreArticles, selectNewsFetchReq } from "../../reducers/explore";
import { NewsArticle } from "../../types/common";
import ArticleHeader from "../ArticlePreview/ArticleHeader";
import ArticlePreview from "../ArticlePreview/ArticlePreview";
import LoadingWrapper from "../LoadingWrapper/LoadingWrapper";

const NewsFeed: React.FC<any> = ({ articles=[], fetchState, dispatch }) => {
  React.useEffect(() => {dispatch(getNewsArticles())},[])
  return (
    <LoadingWrapper {...fetchState}>
        {
          articles.map( (a: NewsArticle, i: number) => 
            (i===0) ? <ArticleHeader {...a} key={i} /> :  <ArticlePreview {...a} key={i} />
          )
        }
      </LoadingWrapper>);
}

export default connect((state: RootState) => {
  return {
    articles: Object.values(selectExploreArticles(state)),
    fetchState: selectNewsFetchReq(state),
  }
})(NewsFeed);