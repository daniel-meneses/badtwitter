import * as React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { getTrendingTags } from "../../actions/explore";
import { selectTrendingTags } from "../../reducers/explore";
import { Trending as TrendingType } from "../../types/common";
import Trending from "../Trending/Trending";
import Widget from "./Widget";
import styles from './Widget.mod.scss';

type Props = {
  trending: TrendingType[];
  dispatch: AppThunkDispatch;
}

const TrendingWidget: React.FC<Props> = ({trending, dispatch}) => {

  const history = useHistory();

  React.useEffect(()=> {
      dispatch(getTrendingTags())
    },[])
    
  return (
      <Widget
          title={`What's happening`}
          onShowMoreClick={() => history.push('/explore/trending')}
      >
      { 
        trending.map((t: TrendingType, i: number) =>  
          <Trending {...t} className={styles.itemHover} key={i} />)
      }
      </Widget>
  )
}

export const ConnectedTrendingWidget = connect((state: RootState) => ({
  trending: selectTrendingTags(state)
}))(TrendingWidget);


export default React.memo(ConnectedTrendingWidget);