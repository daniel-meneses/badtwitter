import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTrendingTags } from "../../actions/explore";
import { selectTrendingTags } from "../../reducers/explore";
import { Trending as TrendingT } from '../../types/common';
import Trending from "../Trending/Trending";

type TrendingList = {
  trending: TrendingT[];
  dispatch: AppThunkDispatch;
}

const TrendingList:React.FC<TrendingList> = ({ trending, dispatch }) => {

  useEffect(()=> {
    dispatch(getTrendingTags())
  },[])

  return (
    <>
      { 
        trending.map((t: TrendingT, i: number) =>  <Trending {...t}  key={i} />)
      }
    </>
  );
}

export default connect((state: RootState) => ({
  trending: selectTrendingTags(state)
}))(TrendingList);